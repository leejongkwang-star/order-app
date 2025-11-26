# Render Build/Start Command 빠른 참조

## 🚀 백엔드 서버 (Web Service)

### 설정값

| 항목 | 값 |
|------|-----|
| **Root Directory** | `server` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Environment** | `Node` |

### 복사해서 사용

```
Root Directory: server
Build Command: npm install
Start Command: npm start
```

---

## 🎨 프런트엔드 (Static Site)

### 설정값

| 항목 | 값 |
|------|-----|
| **Root Directory** | `ui` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Environment** | `Static` |

### 복사해서 사용

```
Root Directory: ui
Build Command: npm install && npm run build
Publish Directory: dist
```

---

## 📋 설명

### 백엔드
- **Build Command**: 의존성 패키지 설치 (`npm install`)
- **Start Command**: 서버 시작 (`npm start` → `node src/index.js`)

### 프런트엔드
- **Build Command**: 의존성 설치 + 빌드 (`npm install && npm run build`)
- **Publish Directory**: 빌드 결과물 폴더 (`dist`)

---

## ✅ 확인

배포 후 "Logs" 탭에서 확인:
- 백엔드: `서버가 포트 10000에서 실행 중입니다.`
- 프런트엔드: 빌드 성공 메시지


