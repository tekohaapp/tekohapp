/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tekoha: {
          primary: '#9A4C3C',
          bg: '#EEDEC8',
        },
      },
    },
  },
  plugins: [],
}