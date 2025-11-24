import { useState } from 'react'
import './App.css'

// 임의의 커피 메뉴 데이터
const menuItems = [
  {
    id: 1,
    name: '아메리카노(ICE)',
    price: 4000,
    description: '에스프레소에 물을 더해 부드럽고 깔끔한 맛의 아이스 커피',
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 2,
    name: '아메리카노(HOT)',
    price: 4000,
    description: '에스프레소에 물을 더해 따뜻하고 진한 맛의 핫 커피',
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 3,
    name: '카페라떼',
    price: 5000,
    description: '에스프레소와 부드러운 스팀 밀크의 조화',
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 4,
    name: '카푸치노',
    price: 5000,
    description: '에스프레소 위에 풍부한 우유 거품을 올린 클래식 커피',
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 5,
    name: '카라멜 마키아토',
    price: 6000,
    description: '달콤한 카라멜 시럽과 에스프레소, 스팀 밀크의 완벽한 조합',
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 6,
    name: '바닐라 라떼',
    price: 5500,
    description: '부드러운 바닐라 시럽이 들어간 달콤한 라떼',
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
      setCart(prev => prev.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      // 새 항목 추가
      setCart(prev => [...prev, cartItem])
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
    if (cart.length === 0) return
    
    alert(`주문이 완료되었습니다!\n총 금액: ${getTotalPrice().toLocaleString()}원`)
    setCart([])
  }

  // 옵션 요약 텍스트 생성
  const getOptionsSummary = (item) => {
    if (item.options.length === 0) return ''
    return `(${item.options.map(opt => opt.name).join(', ')})`
  }

  return (
    <div className="app">
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
                  <div className="menu-image"></div>
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
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <div className="cart-item-name">
                          {item.name} {getOptionsSummary(item)} X {item.quantity}
                        </div>
                        {item.options.length > 0 && (
                          <div className="cart-item-options">
                            {item.options.map(opt => opt.name).join(', ')}
                          </div>
                        )}
                      </div>
                      <div className="cart-item-price">
                        {getItemPrice(item).toLocaleString()}원
                      </div>
                    </div>
                  ))}
                </div>
                
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
              </>
            )}
          </div>
        </main>
      )}

      {activeTab === 'admin' && (
        <main className="main-content">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>관리자 화면</h2>
            <p>관리자 화면은 추후 구현 예정입니다.</p>
          </div>
        </main>
      )}
    </div>
  )
}

export default App
