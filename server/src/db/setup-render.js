const { initDatabase } = require('./init')
const { seedDatabase } = require('./seed')

// Render 데이터베이스 초기화 및 시드 실행
// Render의 경우 데이터베이스가 이미 생성되어 있으므로 스키마 생성과 시드만 실행
async function setupRenderDatabase() {
  try {
    console.log('Render 데이터베이스 스키마 생성 시작...')
    await initDatabase()
    console.log('초기 데이터 삽입 시작...')
    await seedDatabase()
    console.log('✅ Render 데이터베이스 설정이 완료되었습니다.')
    process.exit(0)
  } catch (error) {
    console.error('❌ 데이터베이스 설정 오류:', error.message)
    console.error('상세 오류:', error)
    console.log('\n다음 사항을 확인해주세요:')
    console.log('1. .env 파일의 데이터베이스 연결 정보가 올바른지 확인')
    console.log('2. Render 데이터베이스가 실행 중인지 확인')
    console.log('3. 데이터베이스 연결 권한 확인')
    process.exit(1)
  }
}

setupRenderDatabase()

