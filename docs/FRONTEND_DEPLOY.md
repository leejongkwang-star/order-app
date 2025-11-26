# 프런트엔드 Render 배포 가이드

## ✅ 코드 확인 결과

프런트엔드 코드는 이미 Render 배포에 준비되어 있습니다!

- ✅ `ui/src/api.js`에서 `VITE_API_URL` 환경 변수를 사용하도록 설정됨
- ✅ 환경 변수가 없으면 기본값 `/api` 사용 (로컬 개발용)
- ✅ 추가 코드 수정 불필요

## 📝 수정할 부분

**수정 불필요!** 코드는 이미 배포 준비가 되어 있습니다.

현재 `ui/src/api.js`의 설정:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
```

이 설정으로:
- **로컬 개발**: `VITE_API_URL`이 없으면 `/api` 사용 (Vite proxy 사용)
- **프로덕션**: Render에서 `VITE_API_URL` 환경 변수 설정 시 해당 URL 사용

## 🚀 Render 배포 과정

### 1단계: Static Site 생성

1. **Render 대시보드 접속**
   - https://dashboard.render.com
   - 로그인

2. **"New +" 버튼 클릭**
   - 상단 오른쪽의 "New +" 버튼

3. **"Static Site" 선택**

### 2단계: GitHub 저장소 연결

1. **GitHub 계정 연결** (처음인 경우)
   - "Connect GitHub" 클릭
   - 저장소 접근 권한 허용

2. **저장소 선택**
   - 프로젝트 저장소 선택
   - Branch: `main` (또는 기본 브랜치)

### 3단계: 빌드 설정

다음 설정값을 입력하세요:

| 항목 | 값 |
|------|-----|
| **Name** | `coffee-order-app` (원하는 이름) |
| **Root Directory** | `ui` ⚠️ 중요! |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Plan** | `Free` (또는 유료 플랜) |

### 4단계: 환경 변수 설정

**Environment Variables** 섹션에서 다음 환경 변수 추가:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-backend-api.onrender.com/api` |

> **중요**: `your-backend-api.onrender.com`을 실제 백엔드 서비스 URL로 변경하세요!
> 
> 예시:
> - 백엔드 서비스 이름이 `coffee-order-api`인 경우
> - URL: `https://coffee-order-api.onrender.com/api`
> 
> **주의**: URL 끝에 `/api`를 포함해야 합니다!

### 5단계: 배포 시작

1. **"Create Static Site" 클릭**
2. 배포가 자동으로 시작됩니다
3. **"Logs" 탭**에서 빌드 진행 상황 확인

### 6단계: 배포 확인

1. 배포 완료 후 **"URL"** 확인
   - 예: `https://coffee-order-app.onrender.com`

2. 브라우저에서 접속하여 확인:
   - ✅ 메뉴 목록이 표시되는지 확인
   - ✅ 주문하기 기능이 작동하는지 확인
   - ✅ 관리자 화면이 작동하는지 확인

## 🔍 배포 후 확인 사항

### 브라우저 콘솔 확인

1. 브라우저 개발자 도구 열기 (F12)
2. **Console** 탭 확인
3. API 호출 오류가 없는지 확인

### 네트워크 탭 확인

1. **Network** 탭 확인
2. API 요청이 올바른 백엔드 URL로 전송되는지 확인
   - 예: `https://coffee-order-api.onrender.com/api/menus`

## 🚨 문제 해결

### API 호출 실패 (CORS 오류)

**증상**: 브라우저 콘솔에 CORS 오류 메시지

**해결 방법**:
1. 백엔드 서비스의 CORS 설정 확인
2. 백엔드 `FRONTEND_URL` 환경 변수에 프런트엔드 URL 추가:
   ```
   FRONTEND_URL=https://coffee-order-app.onrender.com
   ```

### API 호출 실패 (404 오류)

**증상**: API 요청이 404 오류 반환

**해결 방법**:
1. `VITE_API_URL` 환경 변수가 올바른지 확인
2. URL 끝에 `/api`가 포함되어 있는지 확인
3. 백엔드 서비스가 실행 중인지 확인

### 빌드 실패

**증상**: 배포 로그에 빌드 오류

**해결 방법**:
1. **Root Directory**가 `ui`로 설정되었는지 확인
2. **Build Command**가 `npm install && npm run build`인지 확인
3. 로컬에서 빌드 테스트:
   ```bash
   cd ui
   npm install
   npm run build
   ```

### 빈 화면 표시

**증상**: 페이지가 로드되지만 내용이 없음

**해결 방법**:
1. 브라우저 콘솔에서 JavaScript 오류 확인
2. 네트워크 탭에서 리소스 로드 실패 확인
3. `dist` 폴더에 빌드 결과물이 생성되었는지 확인

## 📋 배포 체크리스트

배포 전 확인:
- [ ] 백엔드 서비스가 배포되어 실행 중인지 확인
- [ ] 백엔드 URL 확인 (예: `https://coffee-order-api.onrender.com`)
- [ ] GitHub 저장소에 최신 코드가 푸시되어 있는지 확인

배포 설정:
- [ ] Root Directory: `ui` 설정
- [ ] Build Command: `npm install && npm run build` 설정
- [ ] Publish Directory: `dist` 설정
- [ ] 환경 변수 `VITE_API_URL` 설정 (백엔드 URL 포함)

배포 후 확인:
- [ ] 프런트엔드 URL 접속 확인
- [ ] 메뉴 목록 로드 확인
- [ ] 주문하기 기능 테스트
- [ ] 관리자 화면 접속 확인
- [ ] 브라우저 콘솔 오류 확인

## 💡 팁

### 환경 변수 확인

배포 후 환경 변수가 올바르게 설정되었는지 확인:
1. Render 대시보드 → 프런트엔드 서비스 → Environment
2. `VITE_API_URL` 값 확인

### 빌드 로그 확인

배포 중 문제가 발생하면:
1. "Logs" 탭에서 빌드 로그 확인
2. 오류 메시지 확인
3. 필요시 로컬에서 동일한 명령어로 빌드 테스트

### 무료 플랜 제한사항

- **Sleep Mode**: 15분간 요청이 없으면 sleep 모드로 전환
- 첫 요청 시 약 30초 정도 지연될 수 있음
- 프로덕션 환경에서는 유료 플랜 사용 권장

## 📚 관련 문서

- `RENDER_COMMANDS_QUICK.md` - Build/Start Command 빠른 참조
- `server/RENDER_ENV.md` - 백엔드 환경 변수 설정
- `render.yaml` - Render 설정 파일



