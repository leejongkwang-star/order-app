# Render.com 배포 체크리스트

## 사전 준비

- [ ] GitHub 저장소에 코드 푸시 완료
- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] `node_modules`가 `.gitignore`에 포함되어 있는지 확인

## 1단계: PostgreSQL 데이터베이스 생성

- [ ] Render.com 대시보드 접속
- [ ] "New +" → "PostgreSQL" 선택
- [ ] 데이터베이스 이름 설정: `coffee-order-db`
- [ ] 데이터베이스 생성 완료
- [ ] **Internal Database URL** 복사 및 저장
- [ ] 데이터베이스 정보 (Host, Port, Database, User, Password) 확인

## 2단계: 백엔드 서버 배포

- [ ] "New +" → "Web Service" 선택
- [ ] GitHub 저장소 연결
- [ ] 설정:
  - [ ] Name: `coffee-order-api`
  - [ ] Root Directory: `server` ⚠️ 중요!
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
- [ ] 환경 변수 설정:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=10000`
  - [ ] `DATABASE_URL` (Internal Database URL) 또는 개별 DB 변수들
- [ ] 배포 시작
- [ ] 배포 완료 후 로그 확인
- [ ] 데이터베이스 초기화 확인 (또는 Shell에서 `npm run setup` 실행)
- [ ] 백엔드 URL 확인 및 저장: `https://coffee-order-api.onrender.com`

## 3단계: 프런트엔드 배포

- [ ] "New +" → "Static Site" 선택
- [ ] GitHub 저장소 연결
- [ ] 설정:
  - [ ] Name: `coffee-order-app`
  - [ ] Root Directory: `ui` ⚠️ 중요!
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Publish Directory: `dist`
- [ ] 환경 변수 설정:
  - [ ] `VITE_API_URL=https://coffee-order-api.onrender.com/api` ⚠️ 백엔드 URL 확인!
- [ ] 배포 시작
- [ ] 배포 완료 후 프런트엔드 URL 확인: `https://coffee-order-app.onrender.com`

## 배포 후 테스트

- [ ] 프런트엔드 접속 확인
- [ ] 메뉴 목록 로드 확인
- [ ] 주문하기 기능 테스트
- [ ] 관리자 화면 접속 확인
- [ ] 주문 현황 확인
- [ ] 재고 관리 기능 테스트
- [ ] 주문 상태 변경 테스트

## 문제 해결

### 백엔드가 데이터베이스에 연결되지 않는 경우
- [ ] 환경 변수 `DATABASE_URL` 또는 DB 관련 변수 확인
- [ ] Internal Database URL 사용 확인 (External URL 아님!)
- [ ] 데이터베이스와 백엔드가 같은 지역에 있는지 확인

### 프런트엔드가 API를 호출하지 못하는 경우
- [ ] `VITE_API_URL` 환경 변수 확인
- [ ] 백엔드 URL이 정확한지 확인 (끝에 `/api` 포함 여부)
- [ ] 브라우저 콘솔에서 CORS 오류 확인
- [ ] 백엔드 CORS 설정 확인

### 빌드 실패
- [ ] 로그에서 오류 메시지 확인
- [ ] Root Directory 설정 확인 (`server`, `ui`)
- [ ] Build Command 확인

## 참고 사항

- 무료 플랜은 15분간 요청이 없으면 sleep 모드로 전환됩니다.
- 첫 요청 시 약 30초 정도 지연될 수 있습니다.
- 프로덕션 환경에서는 유료 플랜 사용을 권장합니다.

