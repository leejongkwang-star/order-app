# Render 환경 변수 동기화 체크리스트

## 현재 로컬 .env 파일 값

다음 값들을 Render 대시보드에 설정하세요:

```
NODE_ENV=production
PORT=10000
DB_HOST=dpg-d4j9ar0dl3ps73eal5v0-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=order_app_db_0dfv
DB_USER=coffee_order_user
DB_PASSWORD=bxrpurl1WLRe2QFeOPBg2CvIdcWNsj01
```

## Render 대시보드 설정 단계

### 1단계: 백엔드 서비스 선택
- Render 대시보드 → 백엔드 서비스 (예: `coffee-order-api`) 선택

### 2단계: Environment 섹션으로 이동
- 왼쪽 메뉴에서 "Environment" 클릭

### 3단계: 환경 변수 추가

다음 환경 변수들을 하나씩 추가:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `DB_HOST` | `dpg-d4j9ar0dl3ps73eal5v0-a.oregon-postgres.render.com` |
| `DB_PORT` | `5432` |
| `DB_NAME` | `order_app_db_0dfv` |
| `DB_USER` | `coffee_order_user` |
| `DB_PASSWORD` | `bxrpurl1WLRe2QFeOPBg2CvIdcWNsj01` |

### 4단계: 저장 및 재배포
- "Save Changes" 클릭
- 서비스가 자동으로 재배포됩니다
- 또는 "Manual Deploy" → "Deploy latest commit" 클릭

## 대안: DATABASE_URL 사용 (더 간단)

PostgreSQL 데이터베이스 서비스를 연결하면 `DATABASE_URL`이 자동으로 제공됩니다:

1. "Add from Database" 또는 "Link Variable" 클릭
2. PostgreSQL 데이터베이스 선택
3. `DATABASE_URL` 선택

이 경우 개별 DB 변수들(`DB_HOST`, `DB_PORT` 등)은 필요 없습니다.

## 확인

배포 후 "Logs" 탭에서 확인:
- ✅ `데이터베이스에 연결되었습니다.`
- ✅ `서버가 포트 10000에서 실행 중입니다.`

