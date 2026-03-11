/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--white)',
        foreground: 'var(--black)',
        primary: 'var(--black)',
        accent: 'var(--accent)',
        'light-gray': 'var(--light-gray)',
        gray: 'var(--gray)',
        'card-bg': 'var(--card-bg)',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        barlow: ['"Barlow"', 'sans-serif'],
        'barlow-condensed': ['"Barlow Condensed"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
