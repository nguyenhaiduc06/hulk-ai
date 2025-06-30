/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'clash-extralight': ['ClashGrotesk-Extralight'],
        'clash-light': ['ClashGrotesk-Light'],
        'clash-regular': ['ClashGrotesk-Regular'],
        'clash-medium': ['ClashGrotesk-Medium'],
        'clash-semibold': ['ClashGrotesk-Semibold'],
        'clash-bold': ['ClashGrotesk-Bold'],
        inter: ['Inter'],
      },
      colors: {
        primary: {
          DEFAULT: '#8ee04e',
          light: '#a7f26b',
        },
        surface: '#f8f9fa',
        text: {
          primary: '#1a1a1a',
          secondary: '#6b7280',
          tertiary: '#9ca3af',
        },
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};
