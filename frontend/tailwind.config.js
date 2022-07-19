/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#711ED4",
        secondary:"#F6228A",
        thrid:"#009E2A"
      }
    
    },
  },
  plugins: [],
}
