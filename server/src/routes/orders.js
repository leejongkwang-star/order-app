const express = require('express')
const router = express.Router()
const pool = require('../config/db')

// GET /api/orders - 주문 목록 조회 (관리자용)
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query
    
    let query = `
      SELECT 
        o.id,
        o.order_date,
        o.status,
        o.total_price,
        json_agg(
          json_build_object(
            'menu_name', m.name,
            'quantity', oi.quantity,
            'item_price', oi.item_price,
            'options', COALESCE(
              (
                SELECT json_agg(opt.name)
                FROM order_item_options oio
                JOIN options opt ON oio.option_id = opt.id
                WHERE oio.order_item_id = oi.id
              ),
              '[]'::json
            )
          )
        ) as items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN menus m ON oi.menu_id = m.id
      WHERE 1=1
    `
    
    const params = []
    let paramIndex = 1
    
    if (status) {
      query += ` AND o.status = $${paramIndex}`
      params.push(status)
      paramIndex++
    }
    
    query += `
      GROUP BY o.id, o.order_date, o.status, o.total_price
      ORDER BY o.order_date DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `
    params.push(parseInt(limit), parseInt(offset))
    
    const result = await pool.query(query, params)
    
    // 전체 주문 개수 조회
    let countQuery = 'SELECT COUNT(*) FROM orders'
    const countParams = []
    if (status) {
      countQuery += ' WHERE status = $1'
      countParams.push(status)
    }
    const countResult = await pool.query(countQuery, countParams)
    const total = parseInt(countResult.rows[0].count)
    
    res.json({
      success: true,
      data: {
        orders: result.rows,
        total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    })
  } catch (error) {
    console.error('주문 목록 조회 오류:', error)
    res.status(500).json({
      success: false,
      error: '주문 목록을 불러오는데 실패했습니다.'
    })
  }
})

// GET /api/orders/:orderId - 주문 상세 조회
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params
    
    // 주문 기본 정보 조회
    const orderQuery = `
      SELECT 
        id,
        order_date,
        status,
        total_price,
        created_at,
        updated_at
      FROM orders
      WHERE id = $1
    `
    
    const orderResult = await pool.query(orderQuery, [orderId])
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: '주문을 찾을 수 없습니다.'
      })
    }
    
    const order = orderResult.rows[0]
    
    // 주문 항목 및 옵션 조회
    const itemsQuery = `
      SELECT 
        oi.id,
        oi.menu_id,
        m.name as menu_name,
        oi.quantity,
        oi.item_price,
        COALESCE(
          json_agg(
            json_build_object(
              'id', opt.id,
              'name', opt.name,
              'price', opt.price
            )
          ) FILTER (WHERE opt.id IS NOT NULL),
          '[]'::json
        ) as options
      FROM order_items oi
      JOIN menus m ON oi.menu_id = m.id
      LEFT JOIN order_item_options oio ON oi.id = oio.order_item_id
      LEFT JOIN options opt ON oio.option_id = opt.id
      WHERE oi.order_id = $1
      GROUP BY oi.id, oi.menu_id, m.name, oi.quantity, oi.item_price
    `
    
    const itemsResult = await pool.query(itemsQuery, [orderId])
    
    res.json({
      success: true,
      data: {
        ...order,
        items: itemsResult.rows
      }
    })
  } catch (error) {
    console.error('주문 조회 오류:', error)
    res.status(500).json({
      success: false,
      error: '주문을 불러오는데 실패했습니다.'
    })
  }
})

// POST /api/orders - 주문 생성
router.post('/', async (req, res) => {
  const client = await pool.connect()
  
  try {
    await client.query('BEGIN')
    
    const { items, total_price } = req.body
    
    // 입력 검증
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: '주문 항목이 필요합니다.'
      })
    }
    
    if (!total_price || total_price <= 0) {
      await client.query('ROLLBACK')
      return res.status(400).json({
        success: false,
        error: '유효한 총 금액이 필요합니다.'
      })
    }
    
    // 각 주문 항목 검증
    for (const item of items) {
      // 수량 검증
      if (!item.quantity || item.quantity <= 0 || !Number.isInteger(item.quantity)) {
        await client.query('ROLLBACK')
        return res.status(400).json({
          success: false,
          error: '각 주문 항목의 수량은 1 이상의 정수여야 합니다.'
        })
      }
      
      // 메뉴 ID 검증
      if (!item.menu_id || !Number.isInteger(item.menu_id)) {
        await client.query('ROLLBACK')
        return res.status(400).json({
          success: false,
          error: '유효한 메뉴 ID가 필요합니다.'
        })
      }
    }
    
    // 재고 확인 및 차감
    for (const item of items) {
      const stockCheckQuery = 'SELECT stock FROM menus WHERE id = $1'
      const stockResult = await client.query(stockCheckQuery, [item.menu_id])
      
      if (stockResult.rows.length === 0) {
        await client.query('ROLLBACK')
        return res.status(404).json({
          success: false,
          error: `메뉴 ID ${item.menu_id}를 찾을 수 없습니다.`
        })
      }
      
      const currentStock = stockResult.rows[0].stock
      if (currentStock < item.quantity) {
        await client.query('ROLLBACK')
        return res.status(400).json({
          success: false,
          error: '재고가 부족합니다.'
        })
      }
      
      // 재고 차감
      const updateStockQuery = 'UPDATE menus SET stock = stock - $1 WHERE id = $2'
      await client.query(updateStockQuery, [item.quantity, item.menu_id])
    }
    
    // 주문 생성
    const orderInsertQuery = `
      INSERT INTO orders (order_date, status, total_price)
      VALUES (NOW(), 'received', $1)
      RETURNING id, order_date, status, total_price
    `
    
    const orderResult = await client.query(orderInsertQuery, [total_price])
    const orderId = orderResult.rows[0].id
    
    // 주문 항목 저장
    for (const item of items) {
      const itemInsertQuery = `
        INSERT INTO order_items (order_id, menu_id, quantity, item_price)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `
      
      const itemResult = await client.query(itemInsertQuery, [
        orderId,
        item.menu_id,
        item.quantity,
        item.item_price
      ])
      
      const orderItemId = itemResult.rows[0].id
      
      // 옵션 저장
      if (item.option_ids && item.option_ids.length > 0) {
        for (const optionId of item.option_ids) {
          const optionInsertQuery = `
            INSERT INTO order_item_options (order_item_id, option_id)
            VALUES ($1, $2)
          `
          await client.query(optionInsertQuery, [orderItemId, optionId])
        }
      }
    }
    
    await client.query('COMMIT')
    
    res.status(201).json({
      success: true,
      data: orderResult.rows[0]
    })
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('주문 생성 오류:', error)
    res.status(500).json({
      success: false,
      error: '주문 생성에 실패했습니다.'
    })
  } finally {
    client.release()
  }
})

// PATCH /api/orders/:orderId/status - 주문 상태 변경
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body
    
    // 상태 검증
    const validStatuses = ['received', 'inProgress', 'completed']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: '유효하지 않은 상태입니다. (received, inProgress, completed 중 하나여야 합니다)'
      })
    }
    
    // 주문 존재 확인
    const checkQuery = 'SELECT id FROM orders WHERE id = $1'
    const checkResult = await pool.query(checkQuery, [orderId])
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: '주문을 찾을 수 없습니다.'
      })
    }
    
    // 상태 업데이트
    const updateQuery = `
      UPDATE orders 
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING id, status, updated_at
    `
    
    const result = await pool.query(updateQuery, [status, orderId])
    
    res.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('주문 상태 변경 오류:', error)
    res.status(500).json({
      success: false,
      error: '주문 상태 변경에 실패했습니다.'
    })
  }
})

module.exports = router

