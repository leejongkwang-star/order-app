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

