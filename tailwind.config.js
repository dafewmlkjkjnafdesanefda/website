/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50:  '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
        gold: {
          DEFAULT: '#CA8A04',
          dark:    '#A16207',
          light:   '#FEF08A',
        },
        ink: '#0C0A09',
      },
      fontFamily: {
        serif: ['Playfair Display', ...fontFamily.serif],
        sans:  ['Inter',            ...fontFamily.sans],
      },
      boxShadow: {
        'warm-sm': '0 1px 3px 0 rgba(28,25,23,0.08)',
        'warm-md': '0 4px 16px 0 rgba(28,25,23,0.10)',
        'warm-lg': '0 8px 32px 0 rgba(28,25,23,0.14)',
      },
    },
  },
  plugins: [],
}
