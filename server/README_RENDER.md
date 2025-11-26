# Render.com 배포 환경 변수 설정

## 빠른 시작

### 방법 1: 웹 대시보드 사용 (권장)

1. **Render 대시보드 접속**
   - https://dashboard.render.com
   - 백엔드 서비스 선택

2. **Environment 섹션으로 이동**
   - 왼쪽 메뉴 → "Environment"

3. **환경 변수 추가**
   - 아래 표의 값들을 하나씩 추가

### 방법 2: Render CLI 사용

```bash
# Render CLI 설치
npm install -g render-cli

# 로그인
render login

# 환경 변수 설정 (서비스 이름 수정 필요)
render env:set NODE_ENV=production --service coffee-order-api
render env:set PORT=10000 --service coffee-order-api
render env:set DB_HOST=dpg-d4j9ar0dl3ps73eal5v0-a.oregon-postgres.render.com --service coffee-order-api
render env:set DB_PORT=5432 --service coffee-order-api
render env:set DB_NAME=order_app_db_0dfv --service coffee-order-api
render env:set DB_USER=coffee_order_user --service coffee-order-api
render env:set DB_PASSWORD=bxrpurl1WLRe2QFeOPBg2CvIdcWNsj01 --service coffee-order-api
```

또는 `sync-render-env.sh` 스크립트 사용:
```bash
chmod +x sync-render-env.sh
./sync-render-env.sh
```

## 필수 환경 변수

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `NODE_ENV` | `production` | 프로덕션 환경 |
| `PORT` | `10000` | 서버 포트 (Render가 자동 설정하지만 명시 가능) |
| `DB_HOST` | `dpg-d4j9ar0dl3ps73eal5v0-a.oregon-postgres.render.com` | 데이터베이스 호스트 |
| `DB_PORT` | `5432` | 데이터베이스 포트 |
| `DB_NAME` | `order_app_db_0dfv` | 데이터베이스 이름 |
| `DB_USER` | `coffee_order_user` | 데이터베이스 사용자 |
| `DB_PASSWORD` | `bxrpurl1WLRe2QFeOPBg2CvIdcWNsj01` | 데이터베이스 비밀번호 |

## 선택적 환경 변수

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `FRONTEND_URL` | `https://your-frontend-app.onrender.com` | CORS 허용 도메인 (선택사항) |

## DATABASE_URL 사용 (대안)

PostgreSQL 데이터베이스 서비스를 연결하면 `DATABASE_URL`이 자동으로 제공됩니다:

1. Environment 섹션에서 "Add from Database" 클릭
2. PostgreSQL 데이터베이스 선택
3. `DATABASE_URL` 선택

이 경우 개별 DB 변수들은 필요 없습니다.

## 확인

배포 후 "Logs" 탭에서 다음 메시지 확인:
- ✅ `데이터베이스에 연결되었습니다.`
- ✅ `서버가 포트 10000에서 실행 중입니다.`

## 문제 해결

### 데이터베이스 연결 실패
- 환경 변수가 올바르게 설정되었는지 확인
- Internal Database URL 사용 확인
- SSL 설정이 자동 적용되는지 확인

### CORS 오류
- `FRONTEND_URL`이 프론트엔드 URL과 정확히 일치하는지 확인
- URL 끝에 `/`가 없어야 함

## 상세 가이드

- `RENDER_ENV.md` - 상세 환경 변수 설정 가이드
- `render-env-sync.md` - 단계별 동기화 체크리스트

