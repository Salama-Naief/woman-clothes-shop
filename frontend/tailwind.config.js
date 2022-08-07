/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#7F43DB",
        secondary:"#D97611",
        thrid:"#009E2A"
      }
    
    },
  },
  plugins: [],
}
