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
  
  // 디버깅: cart 상태 변경 시 로그 출력
  useEffect(() => {
    console.log('Cart updated:', cart)
  }, [cart])

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
    console.log('addToCart called:', menuItem.name)
    
    const selectedOpts = menuItem.options.filter(opt => 
      selectedOptions[`${menuItem.id}-${opt.id}`]
    )
    
    console.log('Selected options:', selectedOpts)
    
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
      console.log('Updating existing item at index:', existingItemIndex)
      setCart(prev => {
        const updated = prev.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        console.log('Updated cart:', updated)
        return updated
      })
    } else {
      // 새 항목 추가
      console.log('Adding new item to cart')
      setCart(prev => {
        const updated = [...prev, cartItem]
        console.log('Updated cart:', updated)
        return updated
      })
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

  // 장바구니 수량 증가
  const increaseQuantity = (itemId) => {
    setCart(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ))
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
              <>
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
