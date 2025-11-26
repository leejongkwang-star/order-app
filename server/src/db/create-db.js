const { Client } = require('pg')
require('dotenv').config()

// 데이터베이스 생성 스크립트
async function createDatabase() {
  // postgres 데이터베이스에 연결 (기본 데이터베이스)
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres', // 기본 데이터베이스
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  })

  try {
    await client.connect()
    console.log('PostgreSQL에 연결되었습니다.')

    const dbName = process.env.DB_NAME || 'coffee_order_db'
    
    // 데이터베이스 존재 여부 확인
    const checkDbQuery = `
      SELECT 1 FROM pg_database WHERE datname = $1
    `
    const result = await client.query(checkDbQuery, [dbName])
    
    if (result.rows.length > 0) {
      console.log(`데이터베이스 "${dbName}"가 이미 존재합니다.`)
    } else {
      // 데이터베이스 생성
      await client.query(`CREATE DATABASE ${dbName}`)
      console.log(`데이터베이스 "${dbName}"가 생성되었습니다.`)
    }
    
    await client.end()
    return true
  } catch (error) {
    console.error('데이터베이스 생성 오류:', error.message)
    await client.end()
    throw error
  }
}

// 직접 실행 시
if (require.main === module) {
  createDatabase()
    .then(() => {
      console.log('데이터베이스 생성 완료')
      process.exit(0)
    })
    .catch(err => {
      console.error('오류:', err)
      process.exit(1)
    })
}

module.exports = { createDatabase }

