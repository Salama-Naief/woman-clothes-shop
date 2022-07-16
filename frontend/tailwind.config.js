/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#000066",
        secondary:"#c2c2d6",
        thrid:"#1a1a00"
      }
    
    },
  },
  plugins: [],
}
