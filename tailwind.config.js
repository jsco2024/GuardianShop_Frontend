/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    fontFamily: {
      custom: ["Victor Mono", "monospace"], // Type
    },
    fontStyle:{
      custom: "italic",
    },
    container: {
      center: true,
    },
    extend: { 
     
      colors: {
        primary: "#000000", // colors
        secondary: "#F2F2F2",
        tertiary: "#6A9294",
        fourty: "#FEE092",
        gray: "#D9D9D9"
      },     
    },
    screens: {
      sm: '375px',
      md: '768px',
      //lg: '960px', esta la podria necesitar mas adelante
      lg: '1440px',
      xl: '1669px'
     
    },
  },
  plugins: [],
}