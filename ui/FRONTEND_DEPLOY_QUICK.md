# 프런트엔드 Render 배포 빠른 가이드

## ✅ 코드 수정 필요 여부

**수정 불필요!** 코드는 이미 배포 준비가 되어 있습니다.

`ui/src/api.js`에서 `VITE_API_URL` 환경 변수를 사용하도록 설정되어 있습니다.

## 🚀 Render 배포 단계

### 1. Static Site 생성

1. https://dashboard.render.com 접속
2. **"New +"** → **"Static Site"** 선택
3. GitHub 저장소 연결

### 2. 설정값 입력

| 항목 | 값 |
|------|-----|
| **Name** | `coffee-order-app` |
| **Root Directory** | `ui` ⚠️ 중요! |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Plan** | `Free` |

### 3. 환경 변수 설정

**Environment Variables** 섹션에서:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-backend-api.onrender.com/api` |

> **중요**: `your-backend-api.onrender.com`을 실제 백엔드 URL로 변경!
> URL 끝에 `/api` 포함 필수!

### 4. 배포 시작

**"Create Static Site"** 클릭 → 자동 배포 시작

### 5. 확인

배포 완료 후:
- 프런트엔드 URL 접속 (예: `https://coffee-order-app.onrender.com`)
- 메뉴 목록이 표시되는지 확인
- 브라우저 콘솔(F12)에서 오류 확인

## 🔧 문제 해결

### CORS 오류
백엔드 `FRONTEND_URL` 환경 변수에 프런트엔드 URL 추가:
```
FRONTEND_URL=https://coffee-order-app.onrender.com
```

### API 404 오류
- `VITE_API_URL`이 올바른지 확인
- URL 끝에 `/api` 포함 확인
- 백엔드 서비스 실행 중인지 확인

### 빌드 실패
- Root Directory가 `ui`인지 확인
- 로컬에서 빌드 테스트:
  ```bash
  cd ui
  npm install && npm run build
  ```

## 📋 체크리스트

- [ ] 백엔드 서비스 배포 완료
- [ ] 백엔드 URL 확인
- [ ] Root Directory: `ui` 설정
- [ ] Build Command: `npm install && npm run build` 설정
- [ ] Publish Directory: `dist` 설정
- [ ] `VITE_API_URL` 환경 변수 설정
- [ ] 배포 완료 후 기능 테스트



