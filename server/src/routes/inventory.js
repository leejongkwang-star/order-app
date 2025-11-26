const express = require('express')
const router = express.Router()
const pool = require('../config/db')

// GET /api/inventory - 재고 조회 (관리자용)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        id as menu_id,
        name as menu_name,
        stock
      FROM menus
      ORDER BY id
    `
    
    const result = await pool.query(query)
    
    res.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('재고 조회 오류:', error)
    res.status(500).json({
      success: false,
      error: '재고를 불러오는데 실패했습니다.'
    })
  }
})

// PATCH /api/inventory/:menuId - 재고 수정 (관리자용)
router.patch('/:menuId', async (req, res) => {
  try {
    const { menuId } = req.params
    const { stock, action } = req.body
    
    // 메뉴 존재 확인
    const checkQuery = 'SELECT id, name, stock FROM menus WHERE id = $1'
    const checkResult = await pool.query(checkQuery, [menuId])
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: '메뉴를 찾을 수 없습니다.'
      })
    }
    
    const currentMenu = checkResult.rows[0]
    let newStock
    
    // 재고 업데이트 방식 결정
    if (stock !== undefined) {
      // 직접 재고 값 설정
      if (stock < 0) {
        return res.status(400).json({
          success: false,
          error: '재고는 0 이상이어야 합니다.'
        })
      }
      newStock = stock
    } else if (action === 'increase') {
      // 재고 증가
      newStock = currentMenu.stock + 1
    } else if (action === 'decrease') {
      // 재고 감소
      if (currentMenu.stock <= 0) {
        return res.status(400).json({
          success: false,
          error: '재고는 0 이상이어야 합니다.'
        })
      }
      newStock = currentMenu.stock - 1
    } else {
      return res.status(400).json({
        success: false,
        error: 'stock 또는 action (increase/decrease) 중 하나를 제공해야 합니다.'
      })
    }
    
    // 재고 업데이트
    const updateQuery = `
      UPDATE menus 
      SET stock = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING id, name, stock, updated_at
    `
    
    const result = await pool.query(updateQuery, [newStock, menuId])
    
    res.json({
      success: true,
      data: {
        menu_id: result.rows[0].id,
        menu_name: result.rows[0].name,
        stock: result.rows[0].stock,
        updated_at: result.rows[0].updated_at
      }
    })
  } catch (error) {
    console.error('재고 수정 오류:', error)
    res.status(500).json({
      success: false,
      error: '재고 수정에 실패했습니다.'
    })
  }
})

module.exports = router

