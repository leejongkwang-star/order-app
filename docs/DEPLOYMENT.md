# Render.com 배포 가이드

## 배포 순서

### 1단계: PostgreSQL 데이터베이스 생성

1. **Render.com 대시보드 접속**
   - https://dashboard.render.com 접속
   - 로그인 후 "New +" 버튼 클릭

2. **PostgreSQL 데이터베이스 생성**
   - "PostgreSQL" 선택
   - 설정:
     - **Name**: `coffee-order-db` (또는 원하는 이름)
     - **Database**: `coffee_order_db`
     - **User**: 자동 생성됨
     - **Region**: 가장 가까운 지역 선택
     - **PostgreSQL Version**: 최신 버전 선택
     - **Plan**: Free tier 선택 (또는 유료 플랜)
   - "Create Database" 클릭

3. **데이터베이스 정보 확인**
   - 데이터베이스가 생성되면 "Connections" 섹션에서 다음 정보 확인:
     - **Internal Database URL**: 내부 연결용 (백엔드에서 사용)
     - **External Database URL**: 외부 연결용 (로컬 개발용)
     - **Host, Port, Database, User, Password** 정보 확인

### 2단계: 백엔드 서버 배포

1. **GitHub 저장소 준비**
   - 프로젝트를 GitHub에 푸시 (아직 안 했다면)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Render.com에서 Web Service 생성**
   - Render 대시보드에서 "New +" → "Web Service" 선택
   - GitHub 저장소 연결
   - 설정:
     - **Name**: `coffee-order-api` (또는 원하는 이름)
     - **Region**: 데이터베이스와 동일한 지역 선택
     - **Branch**: `main` (또는 기본 브랜치)
     - **Root Directory**: `server` (중요!)
     - **Runtime**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free tier 선택

3. **환경 변수 설정**
   - "Environment" 섹션에서 다음 환경 변수 추가:
   
   ```
   NODE_ENV=production
   PORT=10000
   DB_HOST=<데이터베이스 호스트>
   DB_PORT=5432
   DB_NAME=coffee_order_db
   DB_USER=<데이터베이스 사용자>
   DB_PASSWORD=<데이터베이스 비밀번호>
   ```
   
   또는 **Internal Database URL**을 사용하는 경우:
   
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=<Internal Database URL>
   ```
   
   > **참고**: Render는 PostgreSQL 데이터베이스를 생성하면 자동으로 `DATABASE_URL` 환경 변수를 제공합니다. 이 경우 `server/src/config/db.js`를 수정하여 `DATABASE_URL`을 우선 사용하도록 해야 합니다.

4. **데이터베이스 초기화**
   - 배포 후 "Manual Deploy" → "Deploy latest commit" 실행
   - 배포가 완료되면 "Logs" 탭에서 데이터베이스 초기화 확인
   - 또는 "Shell" 탭에서 수동으로 실행:
     ```bash
     npm run setup
     ```

5. **백엔드 URL 확인**
   - 배포 완료 후 "Settings" → "URL"에서 백엔드 URL 확인
   - 예: `https://coffee-order-api.onrender.com`

### 3단계: 프런트엔드 배포

1. **Render.com에서 Static Site 생성**
   - Render 대시보드에서 "New +" → "Static Site" 선택
   - GitHub 저장소 연결
   - 설정:
     - **Name**: `coffee-order-app` (또는 원하는 이름)
     - **Branch**: `main` (또는 기본 브랜치)
     - **Root Directory**: `ui` (중요!)
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
     - **Plan**: Free tier 선택

2. **환경 변수 설정**
   - "Environment" 섹션에서 다음 환경 변수 추가:
   
   ```
   VITE_API_URL=https://coffee-order-api.onrender.com/api
   ```
   
   > **중요**: 백엔드 URL을 정확히 입력하세요. 위 예시는 백엔드 서비스 이름이 `coffee-order-api`인 경우입니다.

3. **배포 확인**
   - 배포가 완료되면 프런트엔드 URL 확인
   - 예: `https://coffee-order-app.onrender.com`
   - 브라우저에서 접속하여 정상 작동 확인

## 중요 사항

### 데이터베이스 연결 설정

Render의 PostgreSQL은 `DATABASE_URL` 환경 변수를 자동으로 제공합니다. 
현재 `server/src/config/db.js`는 개별 환경 변수를 사용하도록 설정되어 있습니다.

**옵션 1**: `DATABASE_URL` 사용 (권장)
- `server/src/config/db.js`를 수정하여 `DATABASE_URL`을 우선 사용하도록 변경

**옵션 2**: 개별 환경 변수 사용
- Render 대시보드에서 개별 환경 변수 설정

### CORS 설정

프런트엔드와 백엔드가 다른 도메인에서 실행되므로, 백엔드의 CORS 설정이 필요합니다.
현재 `server/src/index.js`에서 `cors()`를 사용하고 있으므로 기본적으로 모든 도메인을 허용합니다.

프로덕션 환경에서는 특정 도메인만 허용하도록 설정하는 것을 권장합니다:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://coffee-order-app.onrender.com'
}))
```

### 무료 플랜 제한사항

- **Sleep Mode**: 15분간 요청이 없으면 서비스가 sleep 모드로 전환됩니다. 첫 요청 시 약 30초 정도 지연될 수 있습니다.
- **데이터베이스**: 무료 플랜은 90일 후 자동 삭제될 수 있습니다. 프로덕션 환경에서는 유료 플랜 사용을 권장합니다.

## 트러블슈팅

### 백엔드가 데이터베이스에 연결되지 않는 경우
1. 환경 변수가 올바르게 설정되었는지 확인
2. 데이터베이스가 같은 지역에 있는지 확인
3. Internal Database URL을 사용하는지 확인 (External URL은 외부 접속용)

### 프런트엔드가 백엔드 API를 호출하지 못하는 경우
1. `VITE_API_URL` 환경 변수가 올바르게 설정되었는지 확인
2. 백엔드 URL이 정확한지 확인 (끝에 `/api` 포함 여부 확인)
3. 브라우저 콘솔에서 CORS 오류 확인
4. 백엔드 CORS 설정 확인

### 빌드 실패
1. 로그에서 오류 메시지 확인
2. `package.json`의 빌드 스크립트 확인
3. Node.js 버전 확인 (Render는 자동으로 감지하지만, 필요시 `.nvmrc` 파일 추가)

