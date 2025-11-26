const express = require('express')
const router = express.Router()
const pool = require('../config/db')

// GET /api/menus - 메뉴 목록 조회
router.get('/', async (req, res) => {
  try {
    // image_type 컬럼 존재 여부 확인
    const columnCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'menus' AND column_name = 'image_type'
    `)
    
    const hasImageType = columnCheck.rows.length > 0
    
    // 메뉴와 옵션을 함께 조회
    let menusQuery
    if (hasImageType) {
      menusQuery = `
        SELECT 
          m.id,
          m.name,
          m.description,
          m.price,
          m.image,
          m.image_position,
          COALESCE(m.image_type, 'default') as image_type,
          m.stock,
          json_agg(
            json_build_object(
              'id', o.id,
              'name', o.name,
              'price', o.price,
              'menu_id', o.menu_id
            )
          ) FILTER (WHERE o.id IS NOT NULL) as options
        FROM menus m
        LEFT JOIN options o ON m.id = o.menu_id
        GROUP BY m.id, m.name, m.description, m.price, m.image, m.image_position, m.image_type, m.stock
        ORDER BY m.id
      `
    } else {
      menusQuery = `
        SELECT 
          m.id,
          m.name,
          m.description,
          m.price,
          m.image,
          m.image_position,
          'default' as image_type,
          m.stock,
          json_agg(
            json_build_object(
              'id', o.id,
              'name', o.name,
              'price', o.price,
              'menu_id', o.menu_id
            )
          ) FILTER (WHERE o.id IS NOT NULL) as options
        FROM menus m
        LEFT JOIN options o ON m.id = o.menu_id
        GROUP BY m.id, m.name, m.description, m.price, m.image, m.image_position, m.stock
        ORDER BY m.id
      `
    }
    
    const result = await pool.query(menusQuery)
    
    // options가 null인 경우 빈 배열로 변환
    const menus = result.rows.map(menu => ({
      ...menu,
      options: menu.options || []
    }))
    
    res.json({
      success: true,
      data: menus
    })
  } catch (error) {
    console.error('메뉴 조회 오류:', error)
    res.status(500).json({
      success: false,
      error: '메뉴를 불러오는데 실패했습니다.'
    })
  }
})

module.exports = router

