/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#35aa8f',
        purple: '#a287e7',
        navy: {
          DEFAULT: '#0d1f1a',
          dark: '#081410',
          light: '#152d25'
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        navy: {
          800: '#1e3a8a',
          900: '#1e40af',
        }
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0d1f1a 0%, #0d2d2d 30%, #35aa8f 100%)',
        'gradient-dark-green': 'linear-gradient(135deg, #0d1f1a 0%, #081410 50%, #152d25 100%)',
        'gradient-teal': 'linear-gradient(135deg, #35aa8f 0%, #2a9a7f 100%)',
        'gradient-purple': 'linear-gradient(135deg, #a287e7 0%, #8a6dd6 100%)',
        'gradient-acme': 'linear-gradient(135deg, #f59e0b 0%, #d97706 25%, #7c3aed 50%, #3b82f6 75%, #1e40af 100%)',
        'gradient-dark': 'linear-gradient(135deg, #d97706 0%, #1e3a8a 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}