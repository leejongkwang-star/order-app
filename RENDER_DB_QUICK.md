# Render 데이터베이스 배포 빠른 가이드

## 🚀 Render 대시보드에서 데이터베이스 생성

### 1. 데이터베이스 생성

1. https://dashboard.render.com 접속
2. **"New +"** → **"PostgreSQL"** 선택

### 2. 설정값 입력

| 항목 | 값 |
|------|-----|
| **Name** | `coffee-order-db` |
| **Database** | `coffee_order_db` |
| **User** | `coffee_order_user` (또는 자동 생성) |
| **Region** | `Oregon (US West)` (가장 가까운 지역) |
| **PostgreSQL Version** | `Latest` |
| **Plan** | `Free` |

### 3. 생성 완료 후 정보 확인

데이터베이스가 생성되면 다음 정보를 복사해두세요:

- **Internal Database URL** (백엔드 연결용)
- **Host**: `dpg-xxxxx-a.oregon-postgres.render.com`
- **Port**: `5432`
- **Database**: `coffee_order_db`
- **User**: `coffee_order_user`
- **Password**: (생성 시 표시된 비밀번호)

## 🔗 백엔드 서버에 연결

### 방법 1: DATABASE_URL 사용 (가장 간단) ⭐

1. 백엔드 서비스 → **Environment** 섹션
2. **"Add from Database"** 클릭
3. PostgreSQL 데이터베이스 선택
4. `DATABASE_URL` 선택
5. 완료!

### 방법 2: 개별 환경 변수 사용

백엔드 서비스의 Environment에 다음 변수 추가:

```
NODE_ENV=production
PORT=10000
DB_HOST=dpg-xxxxx-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=coffee_order_db
DB_USER=coffee_order_user
DB_PASSWORD=생성된_비밀번호
```

> **참고**: `DB_HOST`는 실제 생성된 호스트명으로 변경하세요.

## ✅ 확인

배포 후 백엔드 서비스의 **Logs** 탭에서 확인:
- ✅ `데이터베이스에 연결되었습니다.`
- ✅ `데이터베이스 스키마가 생성되었습니다.`

## 📋 현재 로컬 설정값 (참고용)

로컬 `.env` 파일의 값들을 Render에도 동일하게 설정:

```
DB_HOST=dpg-d4j9ar0dl3ps73eal5v0-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=order_app_db_0dfv
DB_USER=coffee_order_user
DB_PASSWORD=bxrpurl1WLRe2QFeOPBg2CvIdcWNsj01
```

## 💡 팁

- **Internal Database URL**을 사용하세요 (External URL은 외부 접속용)
- SSL 연결이 자동으로 설정됩니다
- 무료 플랜은 90일 후 자동 삭제될 수 있으니 주의하세요

