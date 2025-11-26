# Render.com 백엔드 환경 변수 설정 가이드

## 필수 환경 변수

Render 대시보드에서 백엔드 서비스의 "Environment" 섹션에 다음 환경 변수를 설정하세요.

### 방법 1: DATABASE_URL 사용 (권장)

Render는 PostgreSQL 데이터베이스를 생성하면 자동으로 `DATABASE_URL` 환경 변수를 제공합니다.

```
NODE_ENV=production
PORT=10000
DATABASE_URL=<Render가 자동으로 제공하는 Internal Database URL>
```

**설정 방법:**
1. Render 대시보드에서 백엔드 서비스 선택
2. "Environment" 섹션으로 이동
3. PostgreSQL 데이터베이스 서비스를 선택
4. "Add Environment Variable" 클릭
5. "Link Variable" 또는 "Add from Database" 선택
6. `DATABASE_URL` 선택 (자동으로 Internal Database URL이 연결됨)

### 방법 2: 개별 데이터베이스 변수 사용

`DATABASE_URL` 대신 개별 변수를 사용하는 경우:

```
NODE_ENV=production
PORT=10000
DB_HOST=<데이터베이스 호스트>
DB_PORT=5432
DB_NAME=<데이터베이스 이름>
DB_USER=<데이터베이스 사용자>
DB_PASSWORD=<데이터베이스 비밀번호>
```

**주의:** Render의 External Database URL을 사용하는 경우 SSL 연결이 자동으로 설정됩니다.

## 선택적 환경 변수

### CORS 설정 (프론트엔드 URL)

프로덕션 환경에서 특정 프론트엔드 도메인만 허용하려면:

```
FRONTEND_URL=https://your-frontend-app.onrender.com
```

이 변수가 없으면 모든 origin을 허용합니다 (개발 환경용).

## 환경 변수 우선순위

1. **DATABASE_URL**이 있으면 → `DATABASE_URL` 사용
2. **DATABASE_URL**이 없으면 → 개별 변수 (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD) 사용

## 현재 로컬 .env 파일과 동기화

로컬 `.env` 파일의 값들을 Render 대시보드에 동일하게 설정하세요:

```bash
# 로컬 .env 파일 예시
NODE_ENV=development
PORT=3000
DB_HOST=dpg-d4j9ar0dl3ps73eal5v0-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=order_app_db_0dfv
DB_USER=coffee_order_user
DB_PASSWORD=bxrpurl1WLRe2QFeOPBg2CvIdcWNsj01
```

**Render 설정:**
- `NODE_ENV=production` (로컬과 다름)
- `PORT=10000` (Render가 자동 설정하지만 명시 가능)
- 나머지 DB 변수들은 로컬과 동일하게 설정

## Render 대시보드에서 설정하는 방법

1. **Render 대시보드 접속**
   - https://dashboard.render.com
   - 백엔드 서비스 선택

2. **Environment 섹션으로 이동**
   - 왼쪽 메뉴에서 "Environment" 클릭

3. **환경 변수 추가**
   - "Add Environment Variable" 버튼 클릭
   - Key와 Value 입력
   - "Save Changes" 클릭

4. **데이터베이스 연결 (방법 1 사용 시)**
   - "Add from Database" 또는 "Link Variable" 선택
   - PostgreSQL 데이터베이스 선택
   - `DATABASE_URL` 선택

## 확인 방법

환경 변수 설정 후:
1. 서비스 재배포 (자동 또는 수동)
2. "Logs" 탭에서 다음 메시지 확인:
   - `데이터베이스에 연결되었습니다.`
   - `데이터베이스 스키마가 생성되었습니다.` (첫 실행 시)

## 문제 해결

### 데이터베이스 연결 실패
- `DATABASE_URL` 또는 개별 DB 변수가 올바르게 설정되었는지 확인
- Internal Database URL을 사용하는지 확인 (External URL은 외부 접속용)
- SSL 설정이 자동으로 적용되는지 확인

### CORS 오류
- `FRONTEND_URL` 환경 변수가 프론트엔드 URL과 정확히 일치하는지 확인
- 프론트엔드 URL에 `/`가 끝에 없어야 함 (예: `https://app.onrender.com`)

