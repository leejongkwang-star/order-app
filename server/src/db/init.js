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
      await pool.query(`
        DO $$ 
        BEGIN 
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'menus' AND column_name = 'image_type'
          ) THEN
            ALTER TABLE menus ADD COLUMN image_type VARCHAR(50);
            UPDATE menus SET image_type = 
              CASE 
                WHEN name = '에스프레소' THEN 'americano-hot'
                WHEN name = '아메리카노' THEN 'americano-hot'
                WHEN name = '라떼' THEN 'latte'
                WHEN name = '카푸치노' THEN 'cappuccino'
                WHEN name = '플랫 화이트' THEN 'latte'
                WHEN name = '콜드 브루' THEN 'americano-ice'
                ELSE 'default'
              END;
            -- 이미지가 있으면 null로 설정하여 SVG 사용
            UPDATE menus SET image = NULL, image_position = NULL WHERE image IS NOT NULL;
          END IF;
        END $$;
      `)
      console.log('데이터베이스 마이그레이션이 완료되었습니다.')
    } catch (migrationError) {
      // 컬럼이 이미 존재하거나 다른 오류인 경우 무시
      if (!migrationError.message.includes('already exists')) {
        console.log('마이그레이션 정보:', migrationError.message)
      }
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

