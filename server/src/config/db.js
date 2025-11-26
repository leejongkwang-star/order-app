const { Pool } = require('pg')
require('dotenv').config()

// PostgreSQL 연결 풀 생성
// Render.com에서는 DATABASE_URL 환경 변수를 제공하므로 우선 사용
let poolConfig

if (process.env.DATABASE_URL) {
  // Render.com 또는 DATABASE_URL이 제공되는 경우
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }
} else {
  // 개별 환경 변수를 사용하는 경우
  // Render의 External Database URL을 사용하는 경우 SSL이 필요함
  const isRenderHost = process.env.DB_HOST && (
    process.env.DB_HOST.includes('render.com') || 
    process.env.DB_HOST.includes('onrender.com')
  )
  
  poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'coffee_order_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    // Render 데이터베이스는 SSL 필요
    ssl: isRenderHost ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000, // Render 연결은 시간이 더 걸릴 수 있음
  }
}

const pool = new Pool(poolConfig)

// 연결 테스트
pool.on('connect', () => {
  console.log('데이터베이스에 연결되었습니다.')
})

pool.on('error', (err) => {
  console.error('데이터베이스 연결 오류:', err)
  process.exit(-1)
})

module.exports = pool

