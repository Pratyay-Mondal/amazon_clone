/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          nav: '#131921',
          nav_light: '#232F3E',
          bg: '#EAEDED',
          button: '#F3A847',
          button_hover: '#F08804',
        }
      }
    },
  },
  plugins: [],
}
