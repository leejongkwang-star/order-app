# Render 환경 변수 빠른 설정 가이드

## 🚀 Render 대시보드에서 설정하기

1. **Render 대시보드 접속**: https://dashboard.render.com
2. **백엔드 서비스 선택** (예: `coffee-order-api`)
3. **Environment 메뉴 클릭**
4. **아래 환경 변수들을 하나씩 추가**:

---

## 📋 복사해서 사용할 환경 변수

### 필수 변수

```
NODE_ENV=production
PORT=10000
DB_HOST=dpg-d4j9ar0dl3ps73eal5v0-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=order_app_db_0dfv
DB_USER=coffee_order_user
DB_PASSWORD=bxrpurl1WLRe2QFeOPBg2CvIdcWNsj01
```

### 설정 방법

각 변수를 추가할 때:
1. "Add Environment Variable" 클릭
2. **Key**에 변수명 입력 (예: `NODE_ENV`)
3. **Value**에 값 입력 (예: `production`)
4. "Save Changes" 클릭

---

## ✅ 설정 후 확인

배포가 완료되면 "Logs" 탭에서 다음 메시지 확인:
- `데이터베이스에 연결되었습니다.`
- `서버가 포트 10000에서 실행 중입니다.`

---

## 💡 팁: DATABASE_URL 사용 (더 간단)

PostgreSQL 데이터베이스 서비스를 연결하면 자동으로 `DATABASE_URL`이 제공됩니다:

1. Environment 섹션에서 **"Add from Database"** 클릭
2. PostgreSQL 데이터베이스 선택
3. `DATABASE_URL` 선택

이 경우 위의 개별 DB 변수들(`DB_HOST`, `DB_PORT` 등)은 **필요 없습니다**.

---

## 📚 더 자세한 정보

- `README_RENDER.md` - 전체 배포 가이드
- `RENDER_ENV.md` - 상세 환경 변수 설명
- `render-env-sync.md` - 단계별 체크리스트

