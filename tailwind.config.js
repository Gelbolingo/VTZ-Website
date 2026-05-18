/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        ink: '#071117',
        aqua: '#38f2d6',
        signal: '#4f8dff',
        sun: '#ffe65b',
      },
      boxShadow: {
        glow: '0 0 60px rgba(56, 242, 214, 0.24)',
        premium: '0 24px 80px rgba(7, 17, 23, 0.16)',
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(rgba(7,17,23,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(7,17,23,.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
