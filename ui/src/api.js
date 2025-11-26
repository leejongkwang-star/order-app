const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// API 호출 헬퍼 함수
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'API 호출에 실패했습니다.')
    }

    return data
  } catch (error) {
    console.error('API 호출 오류:', error)
    throw error
  }
}

// 메뉴 목록 조회
export async function getMenus() {
  const response = await apiCall('/menus')
  return response.data
}

// 주문 생성
export async function createOrder(orderData) {
  const response = await apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  })
  return response.data
}

// 주문 목록 조회
export async function getOrders(params = {}) {
  const queryString = new URLSearchParams(params).toString()
  const endpoint = queryString ? `/orders?${queryString}` : '/orders'
  const response = await apiCall(endpoint)
  return response.data
}

// 주문 상세 조회
export async function getOrder(orderId) {
  const response = await apiCall(`/orders/${orderId}`)
  return response.data
}

// 주문 상태 변경
export async function updateOrderStatus(orderId, status) {
  const response = await apiCall(`/orders/${orderId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
  return response.data
}

// 재고 조회
export async function getInventory() {
  const response = await apiCall('/inventory')
  return response.data
}

// 재고 수정
export async function updateInventory(menuId, data) {
  const response = await apiCall(`/inventory/${menuId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  return response.data
}

