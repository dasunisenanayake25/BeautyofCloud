/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070A11',
        hud: {
          dark: '#070A11',
          surface: '#0B111E',
          card: 'rgba(15, 23, 42, 0.65)',
          border: 'rgba(51, 65, 85, 0.6)',
          accent: '#06B6D4',
          danger: '#EF4444',
          warning: '#F59E0B',
          success: '#10B981',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        radar: {
          '0%': { transform: 'scale(0.8)', opacity: '0.9' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      },
      animation: {
        'radar-pulse': 'radar 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      }
    },
  },
  plugins: [],
}
