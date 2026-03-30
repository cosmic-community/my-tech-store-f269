/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#d9e8ff',
          200: '#bcd7ff',
          300: '#8ec0ff',
          400: '#599eff',
          500: '#3b7bfc',
          600: '#1f57f1',
          700: '#1a45de',
          800: '#1c39b4',
          900: '#1c348d',
        },
        surface: {
          DEFAULT: '#0f1419',
          50: '#f7f8f9',
          100: '#ebedf0',
          200: '#d3d7de',
          300: '#adb3bf',
          400: '#818a9b',
          500: '#626d80',
          600: '#4e576a',
          700: '#404857',
          800: '#383e4b',
          900: '#1a1f28',
          950: '#0f1419',
        },
        accent: {
          DEFAULT: '#00d4ff',
          dark: '#00a8cc',
          light: '#66e5ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}