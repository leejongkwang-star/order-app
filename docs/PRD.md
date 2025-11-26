# 커피 주문 앱

## 1. 프로젝트 개요

### 1.1 프로젝트명
커피 주문 앱

### 1.2 프로젝트 목적
사용자가 커피 메뉴를 주문하고, 관리자가 주문을 관리할 수 있는 간단한 풀스택 웹 앱

### 1.3 개발 범위
- 주문하기 화면(메뉴 선택 및 장바구니 기능)
- 관리자 화면(재고 관리 및 주문 상태 관리)
- 데이터를 생성/조회/수정/삭제할 수 있는 기능

## 2. 기술 스택
- 프런트엔드 : HTML, CSS, 리액트, 자바스크립트
- 백엔드 : Node.js, Express
- 데이터베이스 : PostgreSQL

## 3. 기본 사항
- 프런트엔드와 백엔드를 따로 개발
- 기본적인 웹 기술만 사용
- 학습 목적이므로 사용자 인증이나 결제 기능은 제외
- 메뉴는 커피 메뉴만 있음

## 4. 주문하기 화면 PRD

### 4.1 사용자 및 목표
- **일반 고객**: 카페 내 키오스크/태블릿이나 모바일 기기에서 빠르게 메뉴를 파악하고 주문을 완료하려는 사용자가 주요 타깃.
- **목표**: 최소한의 단계로 원하는 메뉴와 옵션을 선택해 장바구니에 담고, 총 금액을 확인한 뒤 주문을 제출.

### 4.2 핵심 사용자 플로우
1. 앱 진입 시 기본 화면은 `주문하기` 탭.
2. 상단 브랜드 영역(로고/텍스트)과 탭 버튼(`주문하기`, `관리자`) 확인.
3. 사용자는 카드형 메뉴 리스트에서 원하는 음료 선택.
4. 옵션(샷 추가, 시럽 추가 등)을 체크박스로 선택 후 `담기` 버튼을 클릭.
5. 선택된 아이템은 장바구니 박스에 추가되며, 수량 및 금액 합계가 자동 계산.
6. 장바구니 내용 검토 후 `주문하기` CTA 클릭으로 주문 제출.

### 4.3 UI 구성 요소
- **헤더 영역**
  - 좌측: 브랜드명 `COZY`.
  - 우측: 탭 버튼 2개. 현재 페이지(`주문하기`)는 강조 스타일, `관리자` 버튼은 기본 스타일.
- **메뉴 리스트**
  - 가로 3열 카드 레이아웃(반응형 시 1~2열로 줄어들 수 있도록 CSS Grid/Flex 고려).
  - 각 카드 구성: 썸네일 이미지 플레이스홀더, 메뉴명(ICE/HOT 레이블 포함), 가격, 설명 요약, 옵션 체크박스, `담기` 버튼.
  - 옵션은 최소 2가지 이상 지원, 선택 시 추가 금액을 괄호로 표현. 예) `샷 추가 (+500원)`.
  - `담기` 버튼 클릭 시 로딩 상태를 보여줄 필요는 없으나, 빠른 연타 방지를 위해 300ms 디버운스 처리 권장.
- **장바구니 영역**
  - 화면 하단 고정 박스. PC 기준 가로 폭 80% 내외, 모서리 라운딩 및 그림자 처리로 카드와 구분.
  - 리스트: 담긴 메뉴명, 선택 옵션 요약, 수량, 개별 금액.
  - 총 금액은 `총 금액 12,500원`과 같이 텍스트 강조(`font-weight: 700`).
  - `주문하기` 버튼은 장바구니가 비어 있을 때 비활성화 상태(회색톤 + 커서 not-allowed).

### 4.4 상태 및 예외 처리
- **빈 상태**: 장바구니에 항목이 없으면 "장바구니가 비어 있습니다" 문구와 함께 CTA 비활성화.
- **옵션 선택**: 필수 옵션은 없으며, 체크 해제 시 추가 금액이 0원으로 반영.
- **수량 증가**: 동일 메뉴를 반복해서 담으면 수량과 금액이 누적. 장바구니 행 단위로 수량 표시.
- **오류 처리**: 재고 부족/네트워크 오류 발생 시 토스트 또는 인라인 에러로 안내하고 장바구니 상태는 유지.

### 4.5 비주얼/인터랙션 가이드
- 전체 톤은 화이트 + 다크 네이비 포인트. border-color는 중간 톤(#003049 ±) 사용.
- 버튼 상태: 기본(화이트 배경, 네이비 테두리), hover(네이비 배경 + 화이트 텍스트), disabled(밝은 회색).
- 폰트: 기본 `Pretendard` 또는 시스템 폰트, 제목 20px, 본문 14~16px.
- 반응형: 768px 이하에서는 메뉴 카드가 단일 열 스크롤 형태로 전환, 장바구니는 전체 폭 차지.

### 4.6 추적 지표
- 메뉴 카드 클릭 대비 장바구니 추가율.
- 장바구니에서 주문 전환율.
- 옵션 선택 비율(샷/시럽).

### 4.7 오픈 이슈
- 메뉴 옵션 종류가 더 늘어날지 여부(예: 우유 타입). 백엔드 스키마 확정 필요.
- 장바구니에 담긴 항목 수정/삭제 기능 제공 범위.

## 5. 관리자 화면 PRD

### 5.1 사용자 및 목표
- **매장 관리자/스태프**: 재고 상황과 실시간 주문 흐름을 한 화면에서 모니터링하는 사용자가 대상.
- **목표**: 재고 수량 조정, 신규 주문 접수/상태 업데이트, 주문 현황 파악을 최소한의 클릭으로 수행.

### 5.2 핵심 사용자 플로우
1. 상단 탭에서 `관리자` 선택 시 관리자 대시보드 진입.
2. 첫 섹션에서 전체 주문 KPI(총 주문/접수/제조 중/완료)를 확인.
3. 재고 현황 섹션에서 각 메뉴 카드의 `+`/`-` 버튼으로 수량을 조정하고, 조정 결과는 즉시 서버에 반영.
4. 주문 현황 섹션에서 시간순으로 정렬된 주문 리스트를 확인, 행 우측의 `주문 접수` 또는 다음 상태 버튼을 클릭하여 주문 상태를 변경.
5. 필요 시 다른 탭으로 이동하거나 새로고침 없이 실시간 업데이트 수신.

### 5.3 UI 구성 요소
- **헤더 영역**
  - 브랜드명과 탭 UI는 주문하기 화면과 동일. 현재 탭(`관리자`) 강조.
- **관리자 대시보드 카드**
  - KPI 텍스트 포맷: `총 주문 1 / 주문 접수 1 / 제조 중 0 / 제조 완료 0`.
  - 폰트는 본문 대비 강조, 배경은 연한 회색 박스.
- **재고 현황 카드 리스트**
  - 메뉴별 카드: 메뉴명, 현재 재고(숫자 + `개`), `+`, `-` 버튼.
  - 버튼 클릭 시 수량 증감(최소 0), 낙관적 UI 업데이트 + 실패 시 롤백 메시지.
  - 카드 간 여백 16px, 모바일에서는 1열 스택.
- **주문 현황 리스트**
  - 각 행: 주문 시각, 메뉴명+수량, 금액, 상태 액션 버튼.
  - 기본 상태는 `주문 접수` 버튼, 접수 후에는 `제조 시작`, `제조 완료` 등 단계별 버튼으로 교체할 수 있도록 확장성 확보.
  - 긴 주문 목록일 경우 세로 스크롤 가능(섹션 높이 400px 고정 + overflow-y).

### 5.4 상태 및 예외 처리
- **KPI 숫자**: 서버 응답 지연 시 로딩 스켈레톤 표시.
- **재고 조정**
  - `-` 버튼 클릭 시 재고가 0 이하로 내려가지 않도록 차단하고 토스트 메시지로 안내.
  - 동시 수정 충돌 시 최신 서버 값으로 리프레시 후 사용자에게 알림.
- **주문 상태 전환**
  - 이미 처리된 주문에 대해 중복 액션을 시도하면 비활성화 또는 에러 토스트 노출.
  - 실시간으로 신규 주문이 도착하면 리스트 상단에 삽입되고 강조 애니메이션(1초 highlight) 적용.

### 5.5 비주얼/인터랙션 가이드
- 전반적인 컬러 스킴은 주문하기 화면과 동일한 화이트/네이비 계열 유지.
- 버튼 스타일: 재고 조정 버튼은 작은 사각형, 상태 버튼은 pill 형태로 차별화.
- 중요 수치(KPI, 재고 수량)는 `font-weight: 600` 이상으로 표시.
- 반응형: 1024px 이하에서는 섹션들이 세로 스택, KPI → 재고 → 주문 순.
- 실시간 업데이트가 많은 영역(주문 현황)은 최소 60fps를 위해 애니메이션 단순화.

### 5.6 추적 지표
- 재고 조정 횟수 및 조정 후 5분 내 재조정 비율(실수 탐지).
- 주문 상태 전환에 걸린 평균 시간(접수→제조, 제조→완료).
- 관리자 화면 체류 시간과 새로고침 빈도.

### 5.7 오픈 이슈
- 재고 자동 동기화 주기(웹소켓 vs 폴링) 확정 필요.
- 주문 상태 단계 수(접수/제조/완료 외 추가 단계 여부).
- 다중 관리자 동시 접속 시 권한/충돌 처리 정책.

## 6. 백엔드 개발 PRD

### 6.1 데이터 모델

#### 6.1.1 Menus (메뉴)
메뉴 정보를 저장하는 테이블

**필드:**
- `id` (Primary Key, Integer, Auto Increment): 메뉴 고유 ID
- `name` (VARCHAR, NOT NULL): 커피 이름 (예: "에스프레소", "아메리카노")
- `description` (TEXT): 메뉴 설명
- `price` (INTEGER, NOT NULL): 기본 가격 (원 단위)
- `image` (VARCHAR): 이미지 경로 또는 URL
- `stock` (INTEGER, DEFAULT 0): 재고 수량
- `created_at` (TIMESTAMP, DEFAULT NOW()): 생성 일시
- `updated_at` (TIMESTAMP, DEFAULT NOW()): 수정 일시

#### 6.1.2 Options (옵션)
메뉴 옵션 정보를 저장하는 테이블

**필드:**
- `id` (Primary Key, Integer, Auto Increment): 옵션 고유 ID
- `name` (VARCHAR, NOT NULL): 옵션 이름 (예: "아이스", "샷 추가", "시럽 추가")
- `price` (INTEGER, DEFAULT 0): 옵션 추가 가격 (원 단위)
- `menu_id` (Foreign Key, INTEGER, NOT NULL): 연결된 메뉴 ID (Menus 테이블 참조)
- `created_at` (TIMESTAMP, DEFAULT NOW()): 생성 일시
- `updated_at` (TIMESTAMP, DEFAULT NOW()): 수정 일시

#### 6.1.3 Orders (주문)
주문 정보를 저장하는 테이블

**필드:**
- `id` (Primary Key, Integer, Auto Increment): 주문 고유 ID
- `order_date` (TIMESTAMP, NOT NULL, DEFAULT NOW()): 주문 일시
- `status` (VARCHAR, NOT NULL, DEFAULT 'received'): 주문 상태 ('received': 주문 접수, 'inProgress': 제조 중, 'completed': 제조 완료)
- `total_price` (INTEGER, NOT NULL): 총 주문 금액 (원 단위)
- `created_at` (TIMESTAMP, DEFAULT NOW()): 생성 일시
- `updated_at` (TIMESTAMP, DEFAULT NOW()): 수정 일시

#### 6.1.4 OrderItems (주문 항목)
주문에 포함된 개별 메뉴 항목 정보를 저장하는 테이블

**필드:**
- `id` (Primary Key, Integer, Auto Increment): 주문 항목 고유 ID
- `order_id` (Foreign Key, INTEGER, NOT NULL): 주문 ID (Orders 테이블 참조)
- `menu_id` (Foreign Key, INTEGER, NOT NULL): 메뉴 ID (Menus 테이블 참조)
- `quantity` (INTEGER, NOT NULL, DEFAULT 1): 주문 수량
- `item_price` (INTEGER, NOT NULL): 해당 항목의 총 가격 (메뉴 가격 + 옵션 가격) * 수량
- `created_at` (TIMESTAMP, DEFAULT NOW()): 생성 일시

#### 6.1.5 OrderItemOptions (주문 항목 옵션)
주문 항목에 선택된 옵션 정보를 저장하는 테이블

**필드:**
- `id` (Primary Key, Integer, Auto Increment): 주문 항목 옵션 고유 ID
- `order_item_id` (Foreign Key, INTEGER, NOT NULL): 주문 항목 ID (OrderItems 테이블 참조)
- `option_id` (Foreign Key, INTEGER, NOT NULL): 옵션 ID (Options 테이블 참조)
- `created_at` (TIMESTAMP, DEFAULT NOW()): 생성 일시

### 6.2 데이터 스키마를 위한 사용자 흐름

#### 6.2.1 메뉴 조회 및 표시
1. 사용자가 '주문하기' 화면에 접속
2. 백엔드 API를 통해 Menus 테이블에서 모든 메뉴 정보 조회
3. 각 메뉴에 연결된 Options 정보도 함께 조회
4. 프런트엔드에서 메뉴 카드 형태로 표시
5. 관리자 화면에서는 Menus 테이블의 `stock` 필드 값을 '재고 현황'에 표시

#### 6.2.2 장바구니 관리
1. 사용자가 메뉴 카드에서 옵션을 선택하고 '담기' 버튼 클릭
2. 선택된 정보는 프런트엔드 상태(장바구니)에 저장
3. 장바구니에서 수량 조절 가능
4. 장바구니 정보는 주문 전까지 프런트엔드에서만 관리

#### 6.2.3 주문 생성
1. 사용자가 장바구니에서 '주문하기' 버튼 클릭
2. 주문 정보를 Orders 테이블에 저장:
   - `order_date`: 현재 시간
   - `status`: 'received' (주문 접수)
   - `total_price`: 장바구니 총 금액
3. 각 주문 항목을 OrderItems 테이블에 저장:
   - `order_id`: 생성된 주문 ID
   - `menu_id`: 주문한 메뉴 ID
   - `quantity`: 주문 수량
   - `item_price`: (메뉴 가격 + 선택된 옵션 가격 합계) * 수량
4. 선택된 옵션들을 OrderItemOptions 테이블에 저장
5. 주문된 메뉴의 재고 수량 차감 (Menus 테이블의 `stock` 필드 업데이트)

#### 6.2.4 주문 현황 관리
1. 관리자 화면의 '주문 현황'에서 Orders 테이블의 모든 주문 조회
2. 각 주문의 OrderItems와 OrderItemOptions 정보도 함께 조회
3. 주문 목록을 시간순으로 정렬하여 표시
4. 주문 상태 변경:
   - '주문 접수' → '제조 시작' 버튼 클릭 → `status`를 'inProgress'로 변경
   - '제조 중' → '제조 완료' 버튼 클릭 → `status`를 'completed'로 변경

### 6.3 API 설계

#### 6.3.1 메뉴 목록 조회
**엔드포인트:** `GET /api/menus`

**설명:** 주문하기 화면에서 커피 메뉴 목록을 조회

**요청:**
- Method: GET
- Headers: 없음

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "에스프레소",
      "description": "진한 에스프레소 샷, 두꺼운 크레마가 특징",
      "price": 3000,
      "image": "/images/coffee-menu-grid.jpg",
      "imagePosition": "0% 0%",
      "stock": 10,
      "options": [
        {
          "id": 1,
          "name": "샷 추가",
          "price": 1000,
          "menu_id": 1
        },
        {
          "id": 2,
          "name": "시럽 추가",
          "price": 0,
          "menu_id": 1
        }
      ]
    }
    // ... 더 많은 메뉴
  ]
}
```

**에러 응답:**
```json
{
  "success": false,
  "error": "메뉴를 불러오는데 실패했습니다."
}
```

#### 6.3.2 주문 생성
**엔드포인트:** `POST /api/orders`

**설명:** 사용자가 주문하기 버튼을 클릭하면 주문 정보를 저장

**요청:**
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "items": [
    {
      "menu_id": 1,
      "quantity": 2,
      "option_ids": [1, 2],
      "item_price": 8000
    },
    {
      "menu_id": 2,
      "quantity": 1,
      "option_ids": [3],
      "item_price": 4500
    }
  ],
  "total_price": 12500
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "order_date": "2024-11-24T10:30:00Z",
    "status": "received",
    "total_price": 12500
  }
}
```

**에러 응답:**
```json
{
  "success": false,
  "error": "재고가 부족합니다."
}
```

**비즈니스 로직:**
1. 주문 항목의 각 메뉴에 대해 재고 확인
2. 재고가 부족하면 에러 반환
3. 재고가 충분하면:
   - Orders 테이블에 주문 정보 저장
   - OrderItems 테이블에 주문 항목 저장
   - OrderItemOptions 테이블에 옵션 정보 저장
   - Menus 테이블의 재고 수량 차감

#### 6.3.3 주문 조회
**엔드포인트:** `GET /api/orders/:orderId`

**설명:** 주문 ID를 전달하면 해당 주문의 상세 정보를 조회

**요청:**
- Method: GET
- URL Parameters: `orderId` (주문 ID)

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "order_date": "2024-11-24T10:30:00Z",
    "status": "received",
    "total_price": 12500,
    "items": [
      {
        "id": 1,
        "menu_id": 1,
        "menu_name": "에스프레소",
        "quantity": 2,
        "item_price": 8000,
        "options": [
          {
            "id": 1,
            "name": "샷 추가",
            "price": 1000
          },
          {
            "id": 2,
            "name": "시럽 추가",
            "price": 0
          }
        ]
      }
    ]
  }
}
```

**에러 응답:**
```json
{
  "success": false,
  "error": "주문을 찾을 수 없습니다."
}
```

#### 6.3.4 주문 목록 조회 (관리자용)
**엔드포인트:** `GET /api/orders`

**설명:** 관리자 화면에서 모든 주문 목록을 조회

**요청:**
- Method: GET
- Query Parameters (선택):
  - `status`: 주문 상태 필터 ('received', 'inProgress', 'completed')
  - `limit`: 조회할 주문 개수 (기본값: 50)
  - `offset`: 페이지네이션 오프셋 (기본값: 0)

**응답:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 123,
        "order_date": "2024-11-24T10:30:00Z",
        "status": "received",
        "total_price": 12500,
        "items": [
          {
            "menu_name": "에스프레소",
            "quantity": 2,
            "options": ["샷 추가", "시럽 추가"]
          }
        ]
      }
    ],
    "total": 10,
    "limit": 50,
    "offset": 0
  }
}
```

#### 6.3.5 주문 상태 변경
**엔드포인트:** `PATCH /api/orders/:orderId/status`

**설명:** 관리자가 주문 상태를 변경 (주문 접수 → 제조 중 → 제조 완료)

**요청:**
- Method: PATCH
- URL Parameters: `orderId` (주문 ID)
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "status": "inProgress"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "status": "inProgress",
    "updated_at": "2024-11-24T10:35:00Z"
  }
}
```

**에러 응답:**
```json
{
  "success": false,
  "error": "유효하지 않은 상태 변경입니다."
}
```

#### 6.3.6 재고 조회 (관리자용)
**엔드포인트:** `GET /api/inventory`

**설명:** 관리자 화면에서 모든 메뉴의 재고 정보를 조회

**요청:**
- Method: GET

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "menu_id": 1,
      "menu_name": "에스프레소",
      "stock": 10
    },
    {
      "menu_id": 2,
      "menu_name": "아메리카노",
      "stock": 8
    }
  ]
}
```

#### 6.3.7 재고 수정 (관리자용)
**엔드포인트:** `PATCH /api/inventory/:menuId`

**설명:** 관리자가 특정 메뉴의 재고 수량을 수정

**요청:**
- Method: PATCH
- URL Parameters: `menuId` (메뉴 ID)
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "stock": 15
}
```

또는 증감 방식:
```json
{
  "action": "increase" // 또는 "decrease"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "menu_id": 1,
    "menu_name": "에스프레소",
    "stock": 15,
    "updated_at": "2024-11-24T10:40:00Z"
  }
}
```

**에러 응답:**
```json
{
  "success": false,
  "error": "재고는 0 이상이어야 합니다."
}
```

### 6.4 데이터베이스 관계도

```
Menus (1) ──< (N) Options
  │
  │ (1)
  │
  └──< (N) OrderItems ──< (N) OrderItemOptions ──> (1) Options
        │
        │ (N)
        │
        └──> (1) Orders
```

### 6.5 기술 요구사항

#### 6.5.1 백엔드 프레임워크
- Node.js + Express
- RESTful API 설계 원칙 준수
- JSON 형식의 요청/응답

#### 6.5.2 데이터베이스
- PostgreSQL 사용
- 트랜잭션 처리 (주문 생성 시 재고 차감과 주문 저장을 원자적으로 처리)
- 외래 키 제약 조건 설정
- 인덱스 최적화 (주문 조회 시 `order_date`, `status` 필드에 인덱스)

#### 6.5.3 에러 처리
- 모든 API는 일관된 에러 응답 형식 사용
- HTTP 상태 코드 적절히 사용 (200: 성공, 400: 잘못된 요청, 404: 리소스 없음, 500: 서버 오류)
- 데이터베이스 오류는 사용자 친화적인 메시지로 변환

#### 6.5.4 데이터 검증
- 요청 데이터 유효성 검사 (예: 수량은 양수, 가격은 0 이상)
- 재고 부족 시 주문 거부
- 존재하지 않는 메뉴/옵션 ID에 대한 검증

### 6.6 보안 고려사항

- SQL Injection 방지: 파라미터화된 쿼리 사용
- 입력 데이터 검증 및 sanitization
- CORS 설정 (프런트엔드 도메인만 허용)
- Rate Limiting 고려 (과도한 요청 방지)

### 6.7 오픈 이슈

- 주문 히스토리 보관 기간 정책
- 재고 부족 시 알림 시스템 필요 여부
- 주문 취소 기능 추가 여부
- 관리자 인증/권한 관리 필요 여부