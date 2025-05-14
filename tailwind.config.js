/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slot: {
          dark: '#1a1a1a',
          light: '#2a2a2a',
          accent: '#FFD700',
          text: '#ffffff',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'number-spin': 'numberSpin 0.5s ease-out forwards'
      },
      keyframes: {
        numberSpin: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
} 