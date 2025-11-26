const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { testConnection } = require('./db/init')
const pool = require('./config/db')

const app = express()
const PORT = process.env.PORT || 3000

// 미들웨어
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 데이터베이스 연결 테스트
testConnection().catch(err => {
  console.error('데이터베이스 연결 실패:', err.message)
  console.log('데이터베이스 설정을 확인해주세요.')
})

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ 
    message: '커피 주문 앱 백엔드 서버',
    version: '1.0.0'
  })
})

// API 라우트 (추후 추가 예정)
// app.use('/api/menus', require('./routes/menus'))
// app.use('/api/orders', require('./routes/orders'))
// app.use('/api/inventory', require('./routes/inventory'))

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
})

module.exports = app

