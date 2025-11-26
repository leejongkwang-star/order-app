import { useState, useEffect } from 'react'
import './App.css'
import CoffeeImage from './components/CoffeeImage'

// 커피 메뉴 데이터 (첨부 이미지 기반)
// 그리드 이미지에서 각 영역을 잘라서 사용
const menuItems = [
  {
    id: 1,
    name: '에스프레소',
    price: 3000,
    description: '진한 에스프레소 샷, 두꺼운 크레마가 특징',
    imageType: 'espresso',
    image: '/images/coffee-menu-grid.jpg', // 그리드 이미지
    imagePosition: '0% 0%', // 1행 1열 (왼쪽 상단)
    options: [
      { id: 'shot', name: '샷 추가', price: 1000 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 2,
    name: '아메리카노',
    price: 4000,
    description: '에스프레소에 뜨거운 물을 더한 깔끔한 커피',
    imageType: 'americano',
    image: '/images/coffee-menu-grid.jpg', // 그리드 이미지
    imagePosition: '50% 0%', // 1행 2열 (중앙 상단)
    options: [
      { id: 'ice', name: '아이스', price: 500 },
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 3,
    name: '라떼',
    price: 5000,
    description: '에스프레소와 부드러운 스팀 밀크, 라떼 아트가 특징',
    imageType: 'latte',
    image: '/images/coffee-menu-grid.jpg', // 그리드 이미지
    imagePosition: '100% 0%', // 1행 3열 (오른쪽 상단)
    options: [
      { id: 'ice', name: '아이스', price: 500 },
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 4,
    name: '카푸치노',
    price: 5000,
    description: '에스프레소 위에 풍부한 우유 거품, 코코아 파우더 장식',
    imageType: 'cappuccino',
    image: '/images/coffee-menu-grid.jpg', // 그리드 이미지
    imagePosition: '0% 100%', // 2행 1열 (왼쪽 하단)
    options: [
      { id: 'ice', name: '아이스', price: 500 },
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 5,
    name: '플랫 화이트',
    price: 5500,
    description: '에스프레소와 미세한 우유 거품, 진한 커피 맛',
    imageType: 'flat-white',
    image: '/images/coffee-menu-grid.jpg', // 그리드 이미지
    imagePosition: '50% 100%', // 2행 2열 (중앙 하단)
    options: [
      { id: 'ice', name: '아이스', price: 500 },
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 6,
    name: '콜드 브루',
    price: 6000,
    description: '차가운 물로 장시간 추출한 부드럽고 깔끔한 커피',
    imageType: 'cold-brew',
    image: '/images/coffee-menu-grid.jpg', // 그리드 이미지
    imagePosition: '100% 100%', // 2행 3열 (오른쪽 하단)
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  }
]

function App() {
  const [activeTab, setActiveTab] = useState('order')
  const [cart, setCart] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({})
  
  // 관리자 화면 상태
  const [orders, setOrders] = useState([]) // 주문 목록
  const [inventory, setInventory] = useState({
    1: { name: '에스프레소', stock: 10 },
    2: { name: '아메리카노', stock: 10 },
    3: { name: '라떼', stock: 10 },
    4: { name: '카푸치노', stock: 10 },
    5: { name: '플랫 화이트', stock: 10 },
    6: { name: '콜드 브루', stock: 10 }
  })
  
  // 토스트 메시지 상태
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  
  // 토스트 메시지 표시
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' })
    }, 3000)
  }

  // 옵션 선택 핸들러
  const handleOptionChange = (menuId, optionId, checked) => {
    setSelectedOptions(prev => {
      const key = `${menuId}-${optionId}`
      if (checked) {
        return { ...prev, [key]: true }
      } else {
        const newOptions = { ...prev }
        delete newOptions[key]
        return newOptions
      }
    })
  }

  // 장바구니에 추가
  const addToCart = (menuItem) => {
    // 재고 확인
    const currentStock = inventory[menuItem.id]?.stock || 0
    if (currentStock === 0) {
      showToast(`${menuItem.name}은(는) 품절되었습니다.`, 'error')
      return
    }
    
    const selectedOpts = menuItem.options.filter(opt => 
      selectedOptions[`${menuItem.id}-${opt.id}`]
    )
    
    const cartItem = {
      id: Date.now(),
      menuId: menuItem.id,
      name: menuItem.name,
      basePrice: menuItem.price,
      options: selectedOpts,
      quantity: 1
    }

    // 동일한 메뉴와 옵션 조합이 있는지 확인
    const existingItemIndex = cart.findIndex(item => 
      item.menuId === menuItem.id &&
      JSON.stringify(item.options.map(o => o.id).sort()) === 
      JSON.stringify(selectedOpts.map(o => o.id).sort())
    )

    if (existingItemIndex >= 0) {
      // 기존 항목 수량 증가
      const newQuantity = cart[existingItemIndex].quantity + 1
      if (newQuantity > currentStock) {
        showToast(`재고가 부족합니다. (현재 재고: ${currentStock}개)`, 'error')
        return
      }
      setCart(prev => prev.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
      showToast('장바구니에 추가되었습니다.', 'success')
    } else {
      // 새 항목 추가
      setCart(prev => [...prev, cartItem])
      showToast('장바구니에 추가되었습니다.', 'success')
    }

    // 해당 메뉴의 선택 옵션 초기화
    const newOptions = { ...selectedOptions }
    menuItem.options.forEach(opt => {
      delete newOptions[`${menuItem.id}-${opt.id}`]
    })
    setSelectedOptions(newOptions)
  }

  // 장바구니 항목 가격 계산
  const getItemPrice = (item) => {
    const optionsPrice = item.options.reduce((sum, opt) => sum + opt.price, 0)
    return (item.basePrice + optionsPrice) * item.quantity
  }

  // 총 금액 계산
  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + getItemPrice(item), 0)
  }

  // 주문하기
  const handleOrder = () => {
    if (cart.length === 0) {
      showToast('장바구니가 비어 있습니다.', 'error')
      return
    }
    
    // 재고 확인 및 차감
    let hasError = false
    const updatedInventory = { ...inventory }
    
    for (const item of cart) {
      const currentStock = updatedInventory[item.menuId]?.stock || 0
      if (currentStock < item.quantity) {
        showToast(`${item.name}의 재고가 부족합니다. (필요: ${item.quantity}개, 현재: ${currentStock}개)`, 'error')
        hasError = true
        break
      }
      // 재고 차감
      updatedInventory[item.menuId] = {
        ...updatedInventory[item.menuId],
        stock: currentStock - item.quantity
      }
    }
    
    if (hasError) return
    
    // 재고 업데이트
    setInventory(updatedInventory)
    
    const orderId = Date.now()
    const newOrder = {
      id: orderId,
      date: new Date(),
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        options: item.options,
        price: getItemPrice(item)
      })),
      totalPrice: getTotalPrice(),
      status: 'received' // 주문 접수
    }
    
    setOrders(prev => [newOrder, ...prev])
    showToast(`주문이 완료되었습니다! (총 ${getTotalPrice().toLocaleString()}원)`, 'success')
    setCart([])
  }
  
  // 재고 증가
  const increaseInventory = (menuId) => {
    setInventory(prev => ({
      ...prev,
      [menuId]: {
        ...prev[menuId],
        stock: prev[menuId].stock + 1
      }
    }))
  }
  
  // 재고 감소
  const decreaseInventory = (menuId) => {
    setInventory(prev => {
      if (prev[menuId].stock <= 0) return prev
      return {
        ...prev,
        [menuId]: {
          ...prev[menuId],
          stock: prev[menuId].stock - 1
        }
      }
    })
  }
  
  // 재고 상태 텍스트
  const getStockStatus = (stock) => {
    if (stock === 0) return '품절'
    if (stock < 5) return '부족'
    return '여유'
  }
  
  // 재고 상태 색상
  const getStockStatusColor = (stock) => {
    if (stock === 0) return '#f44336'
    if (stock < 5) return '#ff9800'
    return '#4caf50'
  }
  
  // 주문 상태 변경
  const changeOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ))
  }
  
  // 주문 통계 계산
  const getOrderStats = () => {
    const total = orders.length
    const received = orders.filter(o => o.status === 'received').length
    const inProgress = orders.filter(o => o.status === 'inProgress').length
    const completed = orders.filter(o => o.status === 'completed').length
    return { total, received, inProgress, completed }
  }
  
  const orderStats = getOrderStats()

  // 옵션 요약 텍스트 생성
  const getOptionsSummary = (item) => {
    if (item.options.length === 0) return ''
    return `(${item.options.map(opt => opt.name).join(', ')})`
  }

  // 장바구니 수량 증가
  const increaseQuantity = (itemId) => {
    setCart(prev => {
      const item = prev.find(i => i.id === itemId)
      if (!item) return prev
      
      const currentStock = inventory[item.menuId]?.stock || 0
      const newQuantity = item.quantity + 1
      
      if (newQuantity > currentStock) {
        showToast(`재고가 부족합니다. (현재 재고: ${currentStock}개)`, 'error')
        return prev
      }
      
      return prev.map(i => 
        i.id === itemId 
          ? { ...i, quantity: newQuantity }
          : i
      )
    })
  }

  // 장바구니 수량 감소
  const decreaseQuantity = (itemId) => {
    setCart(prev => {
      const item = prev.find(i => i.id === itemId)
      if (item && item.quantity > 1) {
        // 수량이 1보다 크면 감소
        return prev.map(i => 
          i.id === itemId 
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      } else {
        // 수량이 1이면 항목 제거
        return prev.filter(i => i.id !== itemId)
      }
    })
  }

  return (
    <div className="app">
      {/* Toast 메시지 */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
      
      {/* Header */}
      <header className="header">
        <div className="brand">COZY</div>
        <nav className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'order' ? 'active' : ''}`}
            onClick={() => setActiveTab('order')}
          >
            주문하기
          </button>
          <button 
            className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            관리자
          </button>
        </nav>
      </header>

      {/* Main Content */}
      {activeTab === 'order' && (
        <main className="main-content">
          {/* Menu Section */}
          <section className="menu-section">
            <div className="menu-grid">
              {menuItems.map(menuItem => (
                <div key={menuItem.id} className="menu-card">
                  <div 
                    className="menu-image"
                    style={{
                      backgroundImage: menuItem.image ? `url(${menuItem.image})` : 'none',
                      backgroundSize: menuItem.image ? '300% 200%' : 'auto', // 3열 2행 그리드
                      backgroundPosition: menuItem.image ? menuItem.imagePosition : 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {!menuItem.image && <CoffeeImage type={menuItem.imageType} />}
                  </div>
                  <h3 className="menu-name">{menuItem.name}</h3>
                  <div className="menu-price">{menuItem.price.toLocaleString()}원</div>
                  <p className="menu-description">{menuItem.description}</p>
                  
                  <div className="menu-options">
                    {menuItem.options.map(option => (
                      <div key={option.id} className="option-item">
                        <input
                          type="checkbox"
                          id={`${menuItem.id}-${option.id}`}
                          checked={selectedOptions[`${menuItem.id}-${option.id}`] || false}
                          onChange={(e) => handleOptionChange(menuItem.id, option.id, e.target.checked)}
                        />
                        <label htmlFor={`${menuItem.id}-${option.id}`}>
                          {option.name} {option.price > 0 && `(+${option.price.toLocaleString()}원)`}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(menuItem)}
                  >
                    담기
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Shopping Cart */}
          <div className="shopping-cart">
            <h2 className="cart-title">장바구니</h2>
            
            {cart.length === 0 ? (
              <div className="empty-cart">장바구니가 비어 있습니다</div>
            ) : (
              <div className="cart-container">
                <div className="cart-left">
                  <h3 className="cart-section-title">주문 내역</h3>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-info">
                          <div className="cart-item-name">
                            {item.name} {getOptionsSummary(item)}
                          </div>
                          {item.options.length > 0 && (
                            <div className="cart-item-options">
                              {item.options.map(opt => opt.name).join(', ')}
                            </div>
                          )}
                        </div>
                        <div className="cart-item-controls">
                          <div className="quantity-controls">
                            <button 
                              className="quantity-btn"
                              onClick={() => decreaseQuantity(item.id)}
                              aria-label="수량 감소"
                            >
                              −
                            </button>
                            <span className="quantity-display">{item.quantity}</span>
                            <button 
                              className="quantity-btn"
                              onClick={() => increaseQuantity(item.id)}
                              aria-label="수량 증가"
                            >
                              +
                            </button>
                          </div>
                          <div className="cart-item-price">
                            {getItemPrice(item).toLocaleString()}원
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="cart-right">
                  <div className="cart-summary">
                    <div className="cart-total">
                      <span className="cart-total-label">총 금액</span>
                      <span className="cart-total-amount">
                        {getTotalPrice().toLocaleString()}원
                      </span>
                    </div>
                    
                    <button 
                      className="order-btn"
                      onClick={handleOrder}
                      disabled={cart.length === 0}
                    >
                      주문하기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {activeTab === 'admin' && (
        <main className="main-content">
          {/* 관리자 대시보드 */}
          <section className="admin-section">
            <h2 className="admin-section-title">관리자 대시보드</h2>
            <div className="dashboard-stats">
              <div className="stat-item">
                <span className="stat-label">총 주문</span>
                <span className="stat-value">{orderStats.total}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">주문 접수</span>
                <span className="stat-value">{orderStats.received}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">제조 중</span>
                <span className="stat-value">{orderStats.inProgress}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">제조 완료</span>
                <span className="stat-value">{orderStats.completed}</span>
              </div>
            </div>
          </section>

          {/* 재고 현황 */}
          <section className="admin-section">
            <h2 className="admin-section-title">재고 현황</h2>
            <div className="inventory-grid">
              {Object.entries(inventory).map(([menuId, item]) => {
                const stockStatus = getStockStatus(item.stock)
                const statusColor = getStockStatusColor(item.stock)
                return (
                  <div key={menuId} className="inventory-card">
                    <div className="inventory-info">
                      <span className="inventory-name">{item.name}</span>
                      <span className="stock-quantity">{item.stock}개</span>
                      <span 
                        className="stock-status" 
                        style={{ color: statusColor }}
                      >
                        {stockStatus}
                      </span>
                    </div>
                    <div className="inventory-controls">
                      <button 
                        className="inventory-btn"
                        onClick={() => decreaseInventory(parseInt(menuId))}
                        disabled={item.stock <= 0}
                      >
                        −
                      </button>
                      <button 
                        className="inventory-btn"
                        onClick={() => increaseInventory(parseInt(menuId))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* 주문 현황 */}
          <section className="admin-section">
            <h2 className="admin-section-title">주문 현황</h2>
            <div className="orders-list">
              {orders.length === 0 ? (
                <div className="empty-orders">주문이 없습니다</div>
              ) : (
                orders.map(order => {
                  const orderDate = new Date(order.date)
                  const dateStr = `${orderDate.getMonth() + 1}월 ${orderDate.getDate()}일`
                  const timeStr = `${String(orderDate.getHours()).padStart(2, '0')}:${String(orderDate.getMinutes()).padStart(2, '0')}`
                  
                  return (
                    <div key={order.id} className="order-item">
                      <div className="order-info">
                        <div className="order-date">
                          {dateStr} {timeStr}
                        </div>
                        <div className="order-items">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="order-item-detail">
                              {item.name} {item.options.length > 0 && `(${item.options.map(o => o.name).join(', ')})`} x {item.quantity}
                            </div>
                          ))}
                        </div>
                        <div className="order-price">
                          {order.totalPrice.toLocaleString()}원
                        </div>
                      </div>
                      <div className="order-actions">
                        {order.status === 'received' && (
                          <button 
                            className="order-status-btn"
                            onClick={() => changeOrderStatus(order.id, 'inProgress')}
                          >
                            제조 시작
                          </button>
                        )}
                        {order.status === 'inProgress' && (
                          <button 
                            className="order-status-btn"
                            onClick={() => changeOrderStatus(order.id, 'completed')}
                          >
                            제조 완료
                          </button>
                        )}
                        {order.status === 'completed' && (
                          <span className="order-completed">완료</span>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </section>
        </main>
      )}
    </div>
  )
}

export default App
