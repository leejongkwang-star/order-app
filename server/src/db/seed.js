const pool = require('../config/db')

// 초기 데이터 삽입
async function seedDatabase() {
  try {
    // 기존 데이터 확인
    const menuCheck = await pool.query('SELECT COUNT(*) FROM menus')
    if (parseInt(menuCheck.rows[0].count) > 0) {
      console.log('이미 데이터가 존재합니다. 시드 스킵.')
      return
    }

    // 메뉴 데이터 삽입 (각 메뉴에 맞는 image_type 설정, 이미지는 null로 설정하여 SVG 사용)
    const menuInsertQuery = `
      INSERT INTO menus (name, description, price, image, image_position, image_type, stock) VALUES
      ('에스프레소', '진한 에스프레소 샷, 두꺼운 크레마가 특징', 3000, NULL, NULL, 'americano-hot', 10),
      ('아메리카노', '에스프레소에 뜨거운 물을 더한 깔끔한 커피', 4000, NULL, NULL, 'americano-hot', 10),
      ('라떼', '에스프레소와 부드러운 스팀 밀크, 라떼 아트가 특징', 5000, NULL, NULL, 'latte', 10),
      ('카푸치노', '에스프레소 위에 풍부한 우유 거품, 코코아 파우더 장식', 5000, NULL, NULL, 'cappuccino', 10),
      ('플랫 화이트', '에스프레소와 미세한 우유 거품, 진한 커피 맛', 5500, NULL, NULL, 'latte', 10),
      ('콜드 브루', '차가운 물로 장시간 추출한 부드럽고 깔끔한 커피', 6000, NULL, NULL, 'americano-ice', 10)
      RETURNING id, name
    `
    
    const menuResult = await pool.query(menuInsertQuery)
    console.log('메뉴 데이터 삽입 완료:', menuResult.rows.length, '개')

    // 메뉴 ID 매핑
    const menuMap = {}
    menuResult.rows.forEach(row => {
      menuMap[row.name] = row.id
    })

    // 옵션 데이터 삽입
    const optionInsertQuery = `
      INSERT INTO options (name, price, menu_id) VALUES
      -- 에스프레소 옵션
      ('샷 추가', 1000, $1),
      ('시럽 추가', 0, $1),
      -- 아메리카노 옵션
      ('아이스', 500, $2),
      ('샷 추가', 500, $2),
      ('시럽 추가', 0, $2),
      -- 라떼 옵션
      ('아이스', 500, $3),
      ('샷 추가', 500, $3),
      ('시럽 추가', 0, $3),
      -- 카푸치노 옵션
      ('아이스', 500, $4),
      ('샷 추가', 500, $4),
      ('시럽 추가', 0, $4),
      -- 플랫 화이트 옵션
      ('아이스', 500, $5),
      ('샷 추가', 500, $5),
      ('시럽 추가', 0, $5),
      -- 콜드 브루 옵션
      ('샷 추가', 500, $6),
      ('시럽 추가', 0, $6)
    `
    
    await pool.query(optionInsertQuery, [
      menuMap['에스프레소'],
      menuMap['아메리카노'],
      menuMap['라떼'],
      menuMap['카푸치노'],
      menuMap['플랫 화이트'],
      menuMap['콜드 브루']
    ])
    
    console.log('옵션 데이터 삽입 완료')
    console.log('초기 데이터 삽입이 완료되었습니다.')
    
  } catch (error) {
    console.error('데이터 삽입 오류:', error)
    throw error
  }
}

module.exports = { seedDatabase }

