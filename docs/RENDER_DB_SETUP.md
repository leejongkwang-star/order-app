# Render PostgreSQL 데이터베이스 배포 설정 가이드

## 🗄️ Render 대시보드에서 데이터베이스 생성

### 1단계: 데이터베이스 생성

1. **Render 대시보드 접속**
   - https://dashboard.render.com
   - 로그인

2. **"New +" 버튼 클릭**
   - 상단 오른쪽의 "New +" 버튼

3. **"PostgreSQL" 선택**

4. **데이터베이스 설정 입력**

### 📋 데이터베이스 설정값

| 설정 항목 | 값 | 설명 |
|----------|-----|------|
| **Name** | `coffee-order-db` | 서비스 이름 (원하는 이름) |
| **Database** | `coffee_order_db` | 데이터베이스 이름 |
| **User** | `coffee_order_user` | 데이터베이스 사용자 (자동 생성 가능) |
| **Region** | `Oregon (US West)` | 가장 가까운 지역 선택 |
| **PostgreSQL Version** | `Latest` | 최신 버전 선택 |
| **Plan** | `Free` | 무료 플랜 (또는 유료 플랜) |
| **Datadog API Key** | (선택사항) | 모니터링용 |

### 2단계: 데이터베이스 정보 확인

데이터베이스가 생성되면 다음 정보를 확인하세요:

#### Internal Database URL (백엔드 서버에서 사용)
```
postgres://coffee_order_user:비밀번호@dpg-xxxxx-a.oregon-postgres.render.com/coffee_order_db
```

#### 개별 연결 정보
- **Host**: `dpg-xxxxx-a.oregon-postgres.render.com`
- **Port**: `5432`
- **Database**: `coffee_order_db`
- **User**: `coffee_order_user`
- **Password**: (생성 시 표시된 비밀번호 - 복사해두세요!)

### 3단계: 백엔드 서버에 연결

#### 방법 1: DATABASE_URL 사용 (권장)

1. 백엔드 서비스의 **Environment** 섹션으로 이동
2. **"Add from Database"** 또는 **"Link Variable"** 클릭
3. PostgreSQL 데이터베이스 선택
4. `DATABASE_URL` 선택
5. 자동으로 Internal Database URL이 연결됩니다

#### 방법 2: 개별 환경 변수 사용

백엔드 서비스의 Environment 섹션에 다음 변수 추가:

```
NODE_ENV=production
PORT=10000
DB_HOST=dpg-xxxxx-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=coffee_order_db
DB_USER=coffee_order_user
DB_PASSWORD=생성된_비밀번호
```

> **주의**: `DB_HOST`는 실제 생성된 호스트명으로 변경하세요.

### 4단계: 데이터베이스 스키마 생성

데이터베이스가 생성되면 스키마를 생성해야 합니다:

#### 옵션 1: 로컬에서 실행 (이미 완료됨)
```bash
cd server
node src/db/setup-render.js
```

#### 옵션 2: Render Shell에서 실행
1. 백엔드 서비스의 **Shell** 탭으로 이동
2. 다음 명령 실행:
```bash
npm run setup
```

## 🔧 render.yaml 파일 설정 (선택사항)

프로젝트 루트의 `render.yaml` 파일에 데이터베이스 설정이 포함되어 있습니다:

```yaml
databases:
  - name: coffee-order-db
    databaseName: coffee_order_db
    user: coffee_order_user
    plan: free
```

이 파일을 사용하면 Render CLI로 배포할 수 있습니다.

## ✅ 확인 방법

### 데이터베이스 연결 확인

1. 백엔드 서비스의 **Logs** 탭 확인
2. 다음 메시지가 보이면 성공:
   - `데이터베이스에 연결되었습니다.`
   - `데이터베이스 스키마가 생성되었습니다.`

### 데이터베이스 정보 확인

Render 대시보드에서:
1. 데이터베이스 서비스 선택
2. **"Info"** 탭에서 연결 정보 확인
3. **"Connections"** 섹션에서 Internal/External URL 확인

## 🚨 중요 사항

### Internal vs External Database URL

- **Internal Database URL**: Render 내부 서비스 간 연결용 (백엔드 서버에서 사용)
- **External Database URL**: 외부에서 연결할 때 사용 (로컬 개발용)

백엔드 서버는 **Internal Database URL**을 사용해야 합니다.

### SSL 연결

Render의 PostgreSQL은 SSL 연결이 필요합니다. 코드에서 자동으로 처리되지만, 로컬에서 연결할 때는 External URL을 사용하세요.

### 무료 플랜 제한사항

- **90일 후 자동 삭제**: 무료 플랜은 90일간 비활성화되면 자동 삭제될 수 있습니다
- **Sleep 모드 없음**: 데이터베이스는 항상 실행 중입니다
- **용량 제한**: 무료 플랜은 용량 제한이 있습니다

프로덕션 환경에서는 유료 플랜 사용을 권장합니다.

## 📝 현재 설정값 요약

현재 로컬 `.env` 파일의 값:

```
DB_HOST=dpg-d4j9ar0dl3ps73eal5v0-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=order_app_db_0dfv
DB_USER=coffee_order_user
DB_PASSWORD=bxrpurl1WLRe2QFeOPBg2CvIdcWNsj01
```

이 값들을 Render 백엔드 서비스의 Environment 변수에 동일하게 설정하세요.

## 🔗 관련 문서

- `server/RENDER_ENV_QUICK.md` - 환경 변수 빠른 설정
- `server/README_RENDER.md` - 전체 배포 가이드
- `render.yaml` - Render 설정 파일

