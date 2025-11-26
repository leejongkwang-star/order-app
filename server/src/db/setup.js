const { createDatabase } = require('./create-db')
const { initDatabase } = require('./init')
const { seedDatabase } = require('./seed')

// 데이터베이스 초기화 및 시드 실행
async function setupDatabase() {
  try {
    console.log('데이터베이스 생성 확인 중...')
    await createDatabase()
    console.log('데이터베이스 초기화 시작...')
    await initDatabase()
    console.log('초기 데이터 삽입 시작...')
    await seedDatabase()
    console.log('데이터베이스 설정이 완료되었습니다.')
    process.exit(0)
  } catch (error) {
    console.error('데이터베이스 설정 오류:', error.message)
    console.log('\n다음 사항을 확인해주세요:')
    console.log('1. PostgreSQL이 실행 중인지 확인')
    console.log('2. .env 파일의 DB_USER, DB_PASSWORD가 올바른지 확인')
    console.log('3. PostgreSQL 사용자에게 데이터베이스 생성 권한이 있는지 확인')
    process.exit(1)
  }
}

setupDatabase()

