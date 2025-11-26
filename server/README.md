# 커피 주문 앱 백엔드 서버

## 설치

```bash
npm install
```

## 환경 변수 설정

`.env` 파일에 필요한 환경 변수 값들을 설정하세요.

```bash
# .env 파일을 열어서 데이터베이스 정보 등을 수정하세요
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=coffee_order_db
DB_USER=postgres
DB_PASSWORD=your_password
NODE_ENV=development
```

## 데이터베이스 설정

### 1. PostgreSQL 데이터베이스 생성

PostgreSQL에 접속하여 데이터베이스를 생성하세요:

```sql
CREATE DATABASE coffee_order_db;
```

### 2. 데이터베이스 스키마 및 초기 데이터 생성

```bash
npm run setup
```

이 명령어는 다음을 수행합니다:
- 데이터베이스 테이블 생성 (menus, options, orders, order_items, order_item_options)
- 초기 메뉴 및 옵션 데이터 삽입

## 실행

### 개발 모드 (nodemon 사용)
```bash
npm run dev
```

### 프로덕션 모드
```bash
npm start
```

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## API 엔드포인트

- `GET /`: 서버 상태 확인
- `GET /api/menus`: 메뉴 목록 조회 (추후 구현)
- `POST /api/orders`: 주문 생성 (추후 구현)
- `GET /api/orders/:orderId`: 주문 상세 조회 (추후 구현)
- `PATCH /api/orders/:orderId/status`: 주문 상태 변경 (추후 구현)
- `GET /api/inventory`: 재고 조회 (추후 구현)
- `PATCH /api/inventory/:menuId`: 재고 수정 (추후 구현)

## 기술 스택

- Node.js
- Express.js
- PostgreSQL (pg)
- CORS
- dotenv

