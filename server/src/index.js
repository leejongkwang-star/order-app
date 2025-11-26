const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { testConnection, initDatabase } = require('./db/init')
const pool = require('./config/db')

const app = express()
const PORT = process.env.PORT || 3000

// 미들웨어
// CORS 설정
// 프로덕션에서는 FRONTEND_URL 환경 변수로 특정 도메인만 허용 가능
// 환경 변수가 없으면 모든 origin 허용 (개발 및 기본 설정)
const corsOptions = process.env.FRONTEND_URL 
  ? {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    }
  : {}  // 모든 origin 허용
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 디버깅: 요청 로그
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// 데이터베이스 초기화 및 연결 테스트
async function initializeDatabase() {
  try {
    await initDatabase()
    await testConnection()
  } catch (err) {
    console.error('데이터베이스 초기화 실패:', err.message)
    console.log('데이터베이스 설정을 확인해주세요.')
  }
}

initializeDatabase()

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ 
    message: '커피 주문 앱 백엔드 서버',
    version: '1.0.0'
  })
})

// API 라우트
try {
  console.log('라우트 등록 시작...')
  app.use('/api/menus', require('./routes/menus'))
  console.log('/api/menus 라우트 등록 완료')
  app.use('/api/orders', require('./routes/orders'))
  console.log('/api/orders 라우트 등록 완료')
  app.use('/api/inventory', require('./routes/inventory'))
  console.log('/api/inventory 라우트 등록 완료')
} catch (error) {
  console.error('라우트 등록 오류:', error)
  process.exit(1)
}

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    error: '서버 오류가 발생했습니다.'
  })
})

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '요청한 리소스를 찾을 수 없습니다.'
  })
})

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`)
  console.log(`http://localhost:${PORT}`)
  console.log('\n등록된 라우트:')
  console.log('  GET  /')
  console.log('  GET  /api/menus')
  console.log('  GET  /api/orders')
  console.log('  GET  /api/orders/:orderId')
  console.log('  POST /api/orders')
  console.log('  PATCH /api/orders/:orderId/status')
  console.log('  GET  /api/inventory')
  console.log('  PATCH /api/inventory/:menuId')
})

module.exports = app

