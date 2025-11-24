// 커피 이미지 SVG 컴포넌트
const CoffeeImage = ({ type }) => {
  const getCoffeeSVG = (type) => {
    switch(type) {
      case 'americano-ice':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#D4A574', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#C8966A', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#8B6F47', stopOpacity:1}} />
              </linearGradient>
              <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#5D4037', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#3E2723', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#1B0000', stopOpacity:1}} />
              </linearGradient>
              <linearGradient id="iceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#F0F8FF', stopOpacity:0.9}} />
                <stop offset="100%" style={{stopColor:'#B0E0E6', stopOpacity:0.7}} />
              </linearGradient>
              <filter id="shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* 컵 그림자 */}
            <ellipse cx="100" cy="185" rx="45" ry="8" fill="#000000" opacity="0.2"/>
            {/* 컵 외곽 */}
            <path d="M 60 80 L 60 180 Q 60 185 65 185 L 135 185 Q 140 185 140 180 L 140 80 Q 140 75 135 75 L 65 75 Q 60 75 60 80 Z" 
                  fill="url(#cupGradient)" filter="url(#shadow)"/>
            {/* 컵 내부 하이라이트 */}
            <path d="M 65 80 L 65 175 Q 65 180 70 180 L 130 180 Q 135 180 135 175 L 135 85 Q 135 80 130 80 L 70 80 Q 65 80 65 85 Z" 
                  fill="#E8D5B7" opacity="0.3"/>
            {/* 컵 내부 */}
            <path d="M 68 85 L 68 175 Q 68 178 70 178 L 130 178 Q 132 178 132 175 L 132 88 Q 132 85 130 85 L 70 85 Q 68 85 68 88 Z" 
                  fill="#F5E6D3"/>
            {/* 커피 액체 */}
            <path d="M 70 88 L 70 155 Q 70 158 72 158 L 128 158 Q 130 158 130 155 L 130 88 Q 130 85 128 85 L 72 85 Q 70 85 70 88 Z" 
                  fill="url(#coffeeGradient)"/>
            {/* 커피 표면 반사 */}
            <ellipse cx="100" cy="88" rx="30" ry="3" fill="#FFFFFF" opacity="0.2"/>
            {/* 얼음 조각들 */}
            <ellipse cx="85" cy="120" rx="10" ry="10" fill="url(#iceGradient)" filter="url(#shadow)"/>
            <ellipse cx="110" cy="140" rx="8" ry="8" fill="url(#iceGradient)" filter="url(#shadow)"/>
            <ellipse cx="95" cy="160" rx="9" ry="9" fill="url(#iceGradient)" filter="url(#shadow)"/>
            <ellipse cx="105" cy="130" rx="7" ry="7" fill="url(#iceGradient)" filter="url(#shadow)"/>
            {/* 얼음 하이라이트 */}
            <ellipse cx="82" cy="117" rx="4" ry="4" fill="#FFFFFF" opacity="0.6"/>
            <ellipse cx="107" cy="137" rx="3" ry="3" fill="#FFFFFF" opacity="0.6"/>
            {/* 빨대 */}
            <rect x="98" y="40" width="4" height="50" rx="2" fill="#2E7D32" filter="url(#shadow)"/>
            <ellipse cx="100" cy="40" rx="5" ry="3" fill="#4CAF50"/>
            <ellipse cx="100" cy="40" rx="3" ry="2" fill="#66BB6A" opacity="0.7"/>
          </svg>
        )
      case 'americano-hot':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cupGradientHot" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#D4A574', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#C8966A', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#8B6F47', stopOpacity:1}} />
              </linearGradient>
              <linearGradient id="coffeeGradientHot" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#6D4C41', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#3E2723', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#1B0000', stopOpacity:1}} />
              </linearGradient>
              <radialGradient id="steamGradient" cx="50%" cy="50%">
                <stop offset="0%" style={{stopColor:'#FFFFFF', stopOpacity:0.8}} />
                <stop offset="100%" style={{stopColor:'#E0E0E0', stopOpacity:0.3}} />
              </radialGradient>
              <filter id="shadowHot">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* 컵 그림자 */}
            <ellipse cx="100" cy="185" rx="45" ry="8" fill="#000000" opacity="0.2"/>
            {/* 컵 외곽 */}
            <path d="M 60 80 L 60 180 Q 60 185 65 185 L 135 185 Q 140 185 140 180 L 140 80 Q 140 75 135 75 L 65 75 Q 60 75 60 80 Z" 
                  fill="url(#cupGradientHot)" filter="url(#shadowHot)"/>
            {/* 컵 내부 하이라이트 */}
            <path d="M 65 80 L 65 175 Q 65 180 70 180 L 130 180 Q 135 180 135 175 L 135 85 Q 135 80 130 80 L 70 80 Q 65 80 65 85 Z" 
                  fill="#E8D5B7" opacity="0.3"/>
            {/* 컵 내부 */}
            <path d="M 68 85 L 68 175 Q 68 178 70 178 L 130 178 Q 132 178 132 175 L 132 88 Q 132 85 130 85 L 70 85 Q 68 85 68 88 Z" 
                  fill="#F5E6D3"/>
            {/* 커피 액체 */}
            <path d="M 70 88 L 70 155 Q 70 158 72 158 L 128 158 Q 130 158 130 155 L 130 88 Q 130 85 128 85 L 72 85 Q 70 85 70 88 Z" 
                  fill="url(#coffeeGradientHot)"/>
            {/* 커피 표면 반사 */}
            <ellipse cx="100" cy="88" rx="30" ry="3" fill="#FFFFFF" opacity="0.25"/>
            {/* 커피 표면 거품 */}
            <circle cx="90" cy="88" r="2" fill="#8D6E63" opacity="0.5"/>
            <circle cx="110" cy="88" r="1.5" fill="#8D6E63" opacity="0.5"/>
            {/* 증기 */}
            <path d="M 75 60 Q 80 45 85 60 Q 90 50 95 65" 
                  stroke="url(#steamGradient)" strokeWidth="3" fill="none" opacity="0.6" filter="url(#shadowHot)"/>
            <path d="M 95 60 Q 100 45 105 60 Q 110 50 115 65" 
                  stroke="url(#steamGradient)" strokeWidth="3" fill="none" opacity="0.6" filter="url(#shadowHot)"/>
            <path d="M 115 60 Q 120 45 125 60 Q 130 50 135 65" 
                  stroke="url(#steamGradient)" strokeWidth="3" fill="none" opacity="0.6" filter="url(#shadowHot)"/>
          </svg>
        )
      case 'latte':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cupGradientLatte" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#D4A574', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#C8966A', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#8B6F47', stopOpacity:1}} />
              </linearGradient>
              <linearGradient id="foamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#FFFFFF', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#FFF8DC', stopOpacity:0.95}} />
                <stop offset="100%" style={{stopColor:'#F5E6D3', stopOpacity:0.9}} />
              </linearGradient>
              <linearGradient id="coffeeGradientLatte" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#5D4037', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#3E2723', stopOpacity:1}} />
              </linearGradient>
              <filter id="shadowLatte">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* 컵 그림자 */}
            <ellipse cx="100" cy="185" rx="45" ry="8" fill="#000000" opacity="0.2"/>
            {/* 컵 외곽 */}
            <path d="M 60 80 L 60 180 Q 60 185 65 185 L 135 185 Q 140 185 140 180 L 140 80 Q 140 75 135 75 L 65 75 Q 60 75 60 80 Z" 
                  fill="url(#cupGradientLatte)" filter="url(#shadowLatte)"/>
            {/* 컵 내부 하이라이트 */}
            <path d="M 65 80 L 65 175 Q 65 180 70 180 L 130 180 Q 135 180 135 175 L 135 85 Q 135 80 130 80 L 70 80 Q 65 80 65 85 Z" 
                  fill="#E8D5B7" opacity="0.3"/>
            {/* 컵 내부 */}
            <path d="M 68 85 L 68 175 Q 68 178 70 178 L 130 178 Q 132 178 132 175 L 132 88 Q 132 85 130 85 L 70 85 Q 68 85 68 88 Z" 
                  fill="#F5E6D3"/>
            {/* 우유 거품 */}
            <ellipse cx="100" cy="100" rx="32" ry="18" fill="url(#foamGradient)" filter="url(#shadowLatte)"/>
            <ellipse cx="100" cy="96" rx="28" ry="15" fill="#FFFFFF" opacity="0.95"/>
            <ellipse cx="100" cy="92" rx="24" ry="12" fill="#FFF8DC" opacity="0.9"/>
            {/* 거품 텍스처 */}
            <circle cx="90" cy="98" r="3" fill="#FFFFFF" opacity="0.7"/>
            <circle cx="110" cy="96" r="2.5" fill="#FFFFFF" opacity="0.7"/>
            <circle cx="100" cy="94" r="2" fill="#FFFFFF" opacity="0.8"/>
            {/* 커피 액체 */}
            <path d="M 70 110 L 70 155 Q 70 158 72 158 L 128 158 Q 130 158 130 155 L 130 110 Q 130 107 128 107 L 72 107 Q 70 107 70 110 Z" 
                  fill="url(#coffeeGradientLatte)"/>
            {/* 라떼 아트 */}
            <path d="M 85 100 Q 100 108 115 100" stroke="#5D4037" strokeWidth="2.5" fill="none" opacity="0.8"/>
            <path d="M 88 96 Q 100 104 112 96" stroke="#5D4037" strokeWidth="2" fill="none" opacity="0.7"/>
            <path d="M 92 92 Q 100 100 108 92" stroke="#5D4037" strokeWidth="1.5" fill="none" opacity="0.6"/>
            {/* 라떼 아트 하이라이트 */}
            <path d="M 85 100 Q 100 108 115 100" stroke="#8D6E63" strokeWidth="1" fill="none" opacity="0.4"/>
          </svg>
        )
      case 'cappuccino':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cupGradientCapp" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#D4A574', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#C8966A', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#8B6F47', stopOpacity:1}} />
              </linearGradient>
              <linearGradient id="foamGradientCapp" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#FFFFFF', stopOpacity:1}} />
                <stop offset="30%" style={{stopColor:'#FFF8DC', stopOpacity:0.98}} />
                <stop offset="70%" style={{stopColor:'#F5E6D3', stopOpacity:0.95}} />
                <stop offset="100%" style={{stopColor:'#E8D5B7', stopOpacity:0.9}} />
              </linearGradient>
              <linearGradient id="coffeeGradientCapp" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#5D4037', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#3E2723', stopOpacity:1}} />
              </linearGradient>
              <filter id="shadowCapp">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* 컵 그림자 */}
            <ellipse cx="100" cy="185" rx="45" ry="8" fill="#000000" opacity="0.2"/>
            {/* 컵 외곽 */}
            <path d="M 60 80 L 60 180 Q 60 185 65 185 L 135 185 Q 140 185 140 180 L 140 80 Q 140 75 135 75 L 65 75 Q 60 75 60 80 Z" 
                  fill="url(#cupGradientCapp)" filter="url(#shadowCapp)"/>
            {/* 컵 내부 하이라이트 */}
            <path d="M 65 80 L 65 175 Q 65 180 70 180 L 130 180 Q 135 180 135 175 L 135 85 Q 135 80 130 80 L 70 80 Q 65 80 65 85 Z" 
                  fill="#E8D5B7" opacity="0.3"/>
            {/* 컵 내부 */}
            <path d="M 68 85 L 68 175 Q 68 178 70 178 L 130 178 Q 132 178 132 175 L 132 88 Q 132 85 130 85 L 70 85 Q 68 85 68 88 Z" 
                  fill="#F5E6D3"/>
            {/* 두꺼운 거품 */}
            <ellipse cx="100" cy="100" rx="35" ry="22" fill="url(#foamGradientCapp)" filter="url(#shadowCapp)"/>
            <ellipse cx="100" cy="96" rx="32" ry="20" fill="#FFFFFF" opacity="0.98"/>
            <ellipse cx="100" cy="92" rx="28" ry="18" fill="#FFF8DC" opacity="0.95"/>
            <ellipse cx="100" cy="88" rx="24" ry="15" fill="#F5E6D3" opacity="0.9"/>
            {/* 거품 텍스처 */}
            <circle cx="88" cy="98" r="4" fill="#FFFFFF" opacity="0.8"/>
            <circle cx="112" cy="96" r="3.5" fill="#FFFFFF" opacity="0.8"/>
            <circle cx="100" cy="94" r="3" fill="#FFFFFF" opacity="0.85"/>
            <circle cx="95" cy="90" r="2.5" fill="#FFFFFF" opacity="0.75"/>
            <circle cx="105" cy="92" r="2" fill="#FFFFFF" opacity="0.75"/>
            {/* 커피 액체 */}
            <path d="M 70 120 L 70 155 Q 70 158 72 158 L 128 158 Q 130 158 130 155 L 130 120 Q 130 117 128 117 L 72 117 Q 70 117 70 120 Z" 
                  fill="url(#coffeeGradientCapp)"/>
            {/* 시나몬 가루 */}
            <circle cx="88" cy="95" r="2.5" fill="#A0522D" opacity="0.7" filter="url(#shadowCapp)"/>
            <circle cx="112" cy="90" r="2" fill="#A0522D" opacity="0.7" filter="url(#shadowCapp)"/>
            <circle cx="100" cy="100" r="2" fill="#8B4513" opacity="0.7" filter="url(#shadowCapp)"/>
            <circle cx="95" cy="88" r="1.5" fill="#A0522D" opacity="0.6" filter="url(#shadowCapp)"/>
            <circle cx="105" cy="92" r="1.5" fill="#8B4513" opacity="0.6" filter="url(#shadowCapp)"/>
          </svg>
        )
      case 'caramel-macchiato':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cupGradientCaramel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#D4A574', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#C8966A', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#8B6F47', stopOpacity:1}} />
              </linearGradient>
              <linearGradient id="caramelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#D2691E', stopOpacity:0.95}} />
                <stop offset="50%" style={{stopColor:'#CD853F', stopOpacity:0.9}} />
                <stop offset="100%" style={{stopColor:'#A0522D', stopOpacity:0.85}} />
              </linearGradient>
              <linearGradient id="foamGradientCaramel" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#FFFFFF', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#FFF8DC', stopOpacity:0.95}} />
                <stop offset="100%" style={{stopColor:'#F5E6D3', stopOpacity:0.9}} />
              </linearGradient>
              <linearGradient id="coffeeGradientCaramel" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#5D4037', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#3E2723', stopOpacity:1}} />
              </linearGradient>
              <filter id="shadowCaramel">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* 컵 그림자 */}
            <ellipse cx="100" cy="185" rx="45" ry="8" fill="#000000" opacity="0.2"/>
            {/* 컵 외곽 */}
            <path d="M 60 80 L 60 180 Q 60 185 65 185 L 135 185 Q 140 185 140 180 L 140 80 Q 140 75 135 75 L 65 75 Q 60 75 60 80 Z" 
                  fill="url(#cupGradientCaramel)" filter="url(#shadowCaramel)"/>
            {/* 컵 내부 하이라이트 */}
            <path d="M 65 80 L 65 175 Q 65 180 70 180 L 130 180 Q 135 180 135 175 L 135 85 Q 135 80 130 80 L 70 80 Q 65 80 65 85 Z" 
                  fill="#E8D5B7" opacity="0.3"/>
            {/* 컵 내부 */}
            <path d="M 68 85 L 68 175 Q 68 178 70 178 L 130 178 Q 132 178 132 175 L 132 88 Q 132 85 130 85 L 70 85 Q 68 85 68 88 Z" 
                  fill="#F5E6D3"/>
            {/* 카라멜 시럽 레이어 */}
            <path d="M 70 88 L 70 98 Q 70 100 72 100 L 128 100 Q 130 100 130 98 L 130 88 Q 130 86 128 86 L 72 86 Q 70 86 70 88 Z" 
                  fill="url(#caramelGradient)" opacity="0.9"/>
            {/* 카라멜 드리즐 */}
            <path d="M 80 90 Q 100 95 120 90" stroke="#8B4513" strokeWidth="2.5" fill="none" opacity="0.8"/>
            <path d="M 85 93 Q 100 98 115 93" stroke="#A0522D" strokeWidth="2" fill="none" opacity="0.7"/>
            <path d="M 90 96 Q 100 100 110 96" stroke="#CD853F" strokeWidth="1.5" fill="none" opacity="0.6"/>
            {/* 우유 거품 */}
            <ellipse cx="100" cy="105" rx="32" ry="18" fill="url(#foamGradientCaramel)" filter="url(#shadowCaramel)"/>
            <ellipse cx="100" cy="101" rx="28" ry="15" fill="#FFFFFF" opacity="0.95"/>
            {/* 거품 텍스처 */}
            <circle cx="92" cy="103" r="3" fill="#FFFFFF" opacity="0.7"/>
            <circle cx="108" cy="101" r="2.5" fill="#FFFFFF" opacity="0.7"/>
            {/* 커피 액체 */}
            <path d="M 70 115 L 70 155 Q 70 158 72 158 L 128 158 Q 130 158 130 155 L 130 115 Q 130 112 128 112 L 72 112 Q 70 112 70 115 Z" 
                  fill="url(#coffeeGradientCaramel)"/>
            {/* 카라멜 드리즐 하이라이트 */}
            <path d="M 80 90 Q 100 95 120 90" stroke="#D2691E" strokeWidth="1" fill="none" opacity="0.5"/>
          </svg>
        )
      case 'vanilla-latte':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cupGradientVanilla" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#D4A574', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#C8966A', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#8B6F47', stopOpacity:1}} />
              </linearGradient>
              <linearGradient id="vanillaCreamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#FFFFFF', stopOpacity:1}} />
                <stop offset="30%" style={{stopColor:'#FFF8DC', stopOpacity:0.98}} />
                <stop offset="70%" style={{stopColor:'#F5E6D3', stopOpacity:0.95}} />
                <stop offset="100%" style={{stopColor:'#E8D5B7', stopOpacity:0.9}} />
              </linearGradient>
              <linearGradient id="coffeeGradientVanilla" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#5D4037', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#3E2723', stopOpacity:1}} />
              </linearGradient>
              <filter id="shadowVanilla">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* 컵 그림자 */}
            <ellipse cx="100" cy="185" rx="45" ry="8" fill="#000000" opacity="0.2"/>
            {/* 컵 외곽 */}
            <path d="M 60 80 L 60 180 Q 60 185 65 185 L 135 185 Q 140 185 140 180 L 140 80 Q 140 75 135 75 L 65 75 Q 60 75 60 80 Z" 
                  fill="url(#cupGradientVanilla)" filter="url(#shadowVanilla)"/>
            {/* 컵 내부 하이라이트 */}
            <path d="M 65 80 L 65 175 Q 65 180 70 180 L 130 180 Q 135 180 135 175 L 135 85 Q 135 80 130 80 L 70 80 Q 65 80 65 85 Z" 
                  fill="#E8D5B7" opacity="0.3"/>
            {/* 컵 내부 */}
            <path d="M 68 85 L 68 175 Q 68 178 70 178 L 130 178 Q 132 178 132 175 L 132 88 Q 132 85 130 85 L 70 85 Q 68 85 68 88 Z" 
                  fill="#F5E6D3"/>
            {/* 바닐라 크림 */}
            <ellipse cx="100" cy="100" rx="34" ry="20" fill="url(#vanillaCreamGradient)" filter="url(#shadowVanilla)"/>
            <ellipse cx="100" cy="96" rx="30" ry="17" fill="#FFFFFF" opacity="0.98"/>
            <ellipse cx="100" cy="92" rx="26" ry="14" fill="#FFF8DC" opacity="0.95"/>
            {/* 크림 텍스처 */}
            <circle cx="90" cy="98" r="3.5" fill="#FFFFFF" opacity="0.8"/>
            <circle cx="110" cy="96" r="3" fill="#FFFFFF" opacity="0.8"/>
            <circle cx="100" cy="94" r="2.5" fill="#FFFFFF" opacity="0.85"/>
            {/* 커피 액체 */}
            <path d="M 70 110 L 70 155 Q 70 158 72 158 L 128 158 Q 130 158 130 155 L 130 110 Q 130 107 128 107 L 72 107 Q 70 107 70 110 Z" 
                  fill="url(#coffeeGradientVanilla)"/>
            {/* 바닐라 빈 장식 */}
            <ellipse cx="93" cy="95" rx="4" ry="10" fill="#F5DEB3" transform="rotate(-20 93 95)" filter="url(#shadowVanilla)"/>
            <ellipse cx="107" cy="98" rx="3.5" ry="9" fill="#F5DEB3" transform="rotate(15 107 98)" filter="url(#shadowVanilla)"/>
            <ellipse cx="100" cy="92" rx="3" ry="8" fill="#FFF8DC" transform="rotate(-5 100 92)" filter="url(#shadowVanilla)"/>
            {/* 바닐라 빈 하이라이트 */}
            <ellipse cx="92" cy="92" rx="2" ry="5" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 92 92)"/>
            <ellipse cx="106" cy="95" rx="1.5" ry="4" fill="#FFFFFF" opacity="0.6" transform="rotate(15 106 95)"/>
          </svg>
        )
      default:
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cupGradientDefault" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#D4A574', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#C8966A', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#8B6F47', stopOpacity:1}} />
              </linearGradient>
              <linearGradient id="coffeeGradientDefault" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#5D4037', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#3E2723', stopOpacity:1}} />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="185" rx="45" ry="8" fill="#000000" opacity="0.2"/>
            <path d="M 60 80 L 60 180 Q 60 185 65 185 L 135 185 Q 140 185 140 180 L 140 80 Q 140 75 135 75 L 65 75 Q 60 75 60 80 Z" 
                  fill="url(#cupGradientDefault)"/>
            <path d="M 68 85 L 68 175 Q 68 178 70 178 L 130 178 Q 132 178 132 175 L 132 88 Q 132 85 130 85 L 70 85 Q 68 85 68 88 Z" 
                  fill="#F5E6D3"/>
            <path d="M 70 88 L 70 155 Q 70 158 72 158 L 128 158 Q 130 158 130 155 L 130 88 Q 130 85 128 85 L 72 85 Q 70 85 70 88 Z" 
                  fill="url(#coffeeGradientDefault)"/>
          </svg>
        )
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {getCoffeeSVG(type)}
    </div>
  )
}

export default CoffeeImage
