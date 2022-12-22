/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.jsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      colors: {
        gray: {
          100: '#E1E1E6',
          200: '#C4C4CC',
          300: '#8D8D99',
          500: '#323238',
          600: '#29292E',
          700: '#121214',
          900: '#09090A'
        }
      },
      keyframes: {
        focusIn: {
          '0%': {
            filter: 'blur(12px)',
            opacity: 0
          },
          '100%': {
            filter: 'blur(0px)',
            opacity: 1
          }
        }
      },
      animation: {
          focusIn: 'focusIn 2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        },
      },
      backgroundImage: {
        default: 'url(src/assets/default.png)'
      },
      },
  plugins: [],
}