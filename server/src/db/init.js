const pool = require('../config/db')
const fs = require('fs')
const path = require('path')

// 스키마 파일 읽기 및 실행
async function initDatabase() {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    // 스키마 실행
    await pool.query(schema)
    console.log('데이터베이스 스키마가 생성되었습니다.')
    
    // 기존 테이블에 image_type 컬럼이 없으면 추가 (마이그레이션)
    try {
      const columnCheck = await pool.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'menus' AND column_name = 'image_type'
      `)
      
      const hasImageType = columnCheck.rows.length > 0
      
      if (!hasImageType) {
        await pool.query('ALTER TABLE menus ADD COLUMN image_type VARCHAR(50)')
        console.log('image_type 컬럼이 추가되었습니다.')
      }
      
      // 기존 데이터의 image_type 업데이트 (컬럼이 없었거나 값이 없거나 default인 경우)
      await pool.query(`
        UPDATE menus SET image_type = 
          CASE 
            WHEN name = '에스프레소' THEN 'americano-hot'
            WHEN name = '아메리카노' THEN 'americano-hot'
            WHEN name = '라떼' THEN 'latte'
            WHEN name = '카푸치노' THEN 'cappuccino'
            WHEN name = '플랫 화이트' THEN 'latte'
            WHEN name = '콜드 브루' THEN 'americano-ice'
            ELSE COALESCE(image_type, 'default')
          END
        WHERE image_type IS NULL OR image_type = 'default'
      `)
      
      // 이미지가 있으면 null로 설정하여 SVG 사용
      await pool.query(`
        UPDATE menus SET image = NULL, image_position = NULL 
        WHERE image IS NOT NULL
      `)
      
      console.log('데이터베이스 마이그레이션이 완료되었습니다.')
    } catch (migrationError) {
      console.log('마이그레이션 정보:', migrationError.message)
    }
    
    return true
  } catch (error) {
    console.error('데이터베이스 초기화 오류:', error)
    throw error
  }
}

// 데이터베이스 연결 테스트
async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()')
    console.log('데이터베이스 연결 성공:', result.rows[0].now)
    return true
  } catch (error) {
    console.error('데이터베이스 연결 실패:', error.message)
    return false
  }
}

module.exports = {
  initDatabase,
  testConnection
}

