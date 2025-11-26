# Render Build Command와 Start Command 설정 가이드

## 📋 백엔드 서버 (Web Service)

### Render 대시보드 설정

백엔드 서비스를 생성할 때 다음 설정을 입력하세요:

#### Build Command
```
npm install
```

#### Start Command
```
npm start
```

#### Root Directory
```
server
```

### 설명

- **Build Command**: 의존성 패키지를 설치하는 명령어
  - `npm install`은 `package.json`의 모든 의존성을 설치합니다
  - 백엔드는 빌드 과정이 없으므로 패키지 설치만 하면 됩니다

- **Start Command**: 서버를 시작하는 명령어
  - `npm start`는 `package.json`의 `"start": "node src/index.js"` 스크립트를 실행합니다
  - 이 명령어로 Express 서버가 시작됩니다

- **Root Directory**: 프로젝트 루트에서 서버 코드가 있는 폴더
  - `server` 폴더를 지정하면 Render가 해당 폴더에서 명령어를 실행합니다

---

## 📋 프런트엔드 (Static Site)

### Render 대시보드 설정

프런트엔드 서비스를 생성할 때 다음 설정을 입력하세요:

#### Build Command
```
npm install && npm run build
```

#### Publish Directory
```
dist
```

#### Root Directory
```
ui
```

### 설명

- **Build Command**: 의존성 설치 + 빌드
  - `npm install`: 의존성 패키지 설치
  - `&&`: 앞 명령어가 성공하면 다음 명령어 실행
  - `npm run build`: `package.json`의 `"build": "vite build"` 스크립트 실행
  - Vite가 React 앱을 빌드하여 `dist` 폴더에 생성합니다

- **Publish Directory**: 빌드된 정적 파일이 있는 폴더
  - `dist` 폴더에 빌드된 HTML, CSS, JS 파일들이 생성됩니다
  - Render가 이 폴더의 파일들을 웹 서버에 배포합니다

- **Root Directory**: 프로젝트 루트에서 프런트엔드 코드가 있는 폴더
  - `ui` 폴더를 지정하면 Render가 해당 폴더에서 명령어를 실행합니다

---

## 🔍 package.json 스크립트 확인

### 백엔드 (server/package.json)
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

### 프런트엔드 (ui/package.json)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## ✅ Render 대시보드에서 설정하는 방법

### 백엔드 서비스

1. **"New +"** → **"Web Service"** 선택
2. GitHub 저장소 연결
3. **Settings** 섹션에서:
   - **Root Directory**: `server` 입력
   - **Build Command**: `npm install` 입력
   - **Start Command**: `npm start` 입력
   - **Environment**: `Node` 선택

### 프런트엔드 서비스

1. **"New +"** → **"Static Site"** 선택
2. GitHub 저장소 연결
3. **Settings** 섹션에서:
   - **Root Directory**: `ui` 입력
   - **Build Command**: `npm install && npm run build` 입력
   - **Publish Directory**: `dist` 입력

---

## 🚨 주의사항

### 백엔드

- **Root Directory 필수**: `server`를 지정하지 않으면 프로젝트 루트에서 명령어를 실행하려고 해서 실패할 수 있습니다
- **Start Command**: `npm start`만 입력하면 됩니다 (추가 옵션 불필요)

### 프런트엔드

- **Build Command**: `npm install && npm run build`를 한 줄로 입력
- **Publish Directory**: `dist` (빌드 결과물 폴더)
- **Root Directory**: `ui` 필수

---

## 📝 render.yaml 파일 참고

프로젝트 루트의 `render.yaml` 파일에도 설정이 포함되어 있습니다:

```yaml
services:
  # 백엔드
  - type: web
    name: coffee-order-api
    buildCommand: npm install
    startCommand: npm start
    rootDir: server
    
  # 프런트엔드
  - type: web
    name: coffee-order-app
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./ui/dist
    rootDir: ui
```

이 파일을 사용하면 Render CLI로 자동 배포할 수 있습니다.

---

## 🔧 문제 해결

### 빌드 실패

1. **Root Directory 확인**: `server` 또는 `ui`가 올바르게 설정되었는지 확인
2. **명령어 확인**: 정확히 위의 명령어를 입력했는지 확인
3. **로그 확인**: Render의 "Logs" 탭에서 오류 메시지 확인

### 시작 실패

1. **Start Command 확인**: `npm start`가 정확한지 확인
2. **포트 확인**: 코드에서 `process.env.PORT`를 사용하는지 확인 (Render가 자동 설정)
3. **환경 변수 확인**: 필요한 환경 변수가 설정되었는지 확인


