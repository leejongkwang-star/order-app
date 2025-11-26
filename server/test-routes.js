const express = require('express')
const app = express()

// 라우트 테스트
console.log('라우트 테스트 시작...')

try {
  const menusRouter = require('./src/routes/menus')
  console.log('menus 라우터 로드 성공:', typeof menusRouter)
  
  app.use('/api/menus', menusRouter)
  console.log('/api/menus 라우트 등록 완료')
  
  // 라우트 스택 확인
  console.log('등록된 라우트 수:', app._router.stack.length)
  
  app.listen(3001, () => {
    console.log('테스트 서버가 포트 3001에서 실행 중입니다.')
    console.log('http://localhost:3001/api/menus 로 테스트하세요.')
  })
} catch (error) {
  console.error('오류:', error)
  process.exit(1)
}

