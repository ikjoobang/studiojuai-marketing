import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>STUDIOJUAI - AI 마케팅 자동화 플랫폼</title>
        <meta name="description" content="30개 AI 봇이 당신의 마케팅을 완전 자동화합니다. 먼저 다가가는 영업사원처럼!" />
        
        {/* Tailwind CSS CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
        
        {/* Google Fonts - Pretendard */}
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet" />
        
        {/* Custom Tailwind Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
                  },
                  colors: {
                    primary: {
                      50: '#f0fdf4',
                      100: '#dcfce7',
                      200: '#bbf7d0',
                      300: '#86efac',
                      400: '#4ade80',
                      500: '#22c55e',
                      600: '#16a34a',
                      700: '#15803d',
                      800: '#166534',
                      900: '#14532d',
                    },
                    naver: '#03C75A',
                    dark: {
                      bg: '#0f172a',
                      card: '#1e293b',
                      border: '#334155',
                    }
                  },
                  animation: {
                    'gradient': 'gradient 8s linear infinite',
                    'float': 'float 6s ease-in-out infinite',
                    'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    'slide-up': 'slideUp 0.5s ease-out',
                    'fade-in': 'fadeIn 0.5s ease-out',
                    'bounce-slow': 'bounce 3s infinite',
                  },
                  keyframes: {
                    gradient: {
                      '0%, 100%': { backgroundPosition: '0% 50%' },
                      '50%': { backgroundPosition: '100% 50%' },
                    },
                    float: {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-20px)' },
                    },
                    slideUp: {
                      '0%': { transform: 'translateY(20px)', opacity: '0' },
                      '100%': { transform: 'translateY(0)', opacity: '1' },
                    },
                    fadeIn: {
                      '0%': { opacity: '0' },
                      '100%': { opacity: '1' },
                    },
                  },
                },
              },
            }
          `
        }} />
        
        {/* Custom Styles */}
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="font-sans antialiased bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {children}
        
        {/* Global Scripts */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // 다크모드 토글
            function toggleDarkMode() {
              document.documentElement.classList.toggle('dark');
              const isDark = document.documentElement.classList.contains('dark');
              localStorage.setItem('darkMode', isDark ? 'true' : 'false');
            }
            
            // 다크모드 초기화
            (function() {
              const savedDarkMode = localStorage.getItem('darkMode');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              
              if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDark)) {
                document.documentElement.classList.add('dark');
              }
            })();
            
            // API 키 관리
            const ApiKeyManager = {
              KEY_NAME: 'gemini_api_key',
              
              get() {
                return localStorage.getItem(this.KEY_NAME) || '';
              },
              
              set(key) {
                localStorage.setItem(this.KEY_NAME, key);
              },
              
              clear() {
                localStorage.removeItem(this.KEY_NAME);
              },
              
              isSet() {
                return !!this.get();
              }
            };
            
            // 매장 정보 관리
            const StoreInfoManager = {
              KEY_NAME: 'store_info',
              
              get() {
                const saved = localStorage.getItem(this.KEY_NAME);
                return saved ? JSON.parse(saved) : null;
              },
              
              set(info) {
                localStorage.setItem(this.KEY_NAME, JSON.stringify(info));
              },
              
              clear() {
                localStorage.removeItem(this.KEY_NAME);
              }
            };
            
            // 토스트 메시지
            function showToast(message, type = 'info') {
              const colors = {
                success: 'bg-green-500',
                error: 'bg-red-500',
                warning: 'bg-yellow-500',
                info: 'bg-blue-500'
              };
              
              const toast = document.createElement('div');
              toast.className = \`fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white shadow-lg z-50 animate-slide-up \${colors[type]}\`;
              toast.innerHTML = message;
              document.body.appendChild(toast);
              
              setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px)';
                toast.style.transition = 'all 0.3s ease-out';
                setTimeout(() => toast.remove(), 300);
              }, 3000);
            }
            
            // 로딩 오버레이
            function showLoading(message = '처리 중...') {
              const overlay = document.createElement('div');
              overlay.id = 'loading-overlay';
              overlay.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50';
              overlay.innerHTML = \`
                <div class="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-2xl flex flex-col items-center">
                  <div class="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p class="text-lg font-medium text-slate-700 dark:text-slate-200">\${message}</p>
                </div>
              \`;
              document.body.appendChild(overlay);
            }
            
            function hideLoading() {
              const overlay = document.getElementById('loading-overlay');
              if (overlay) overlay.remove();
            }
          `
        }} />
      </body>
    </html>
  )
})
