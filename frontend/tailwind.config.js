/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'purewhite':'#ffffff',
      'purple' :'#61398F',
      'white' : '#E9E4ED',
      'lightpurple':'#9A73B5',
      'grey':"#4A4A4A",
      'red':"#FF0000",
      'lightblack':"#2C2D2D",
      'black':"#000000"
    },
    extend: {},
  },
  plugins: [],
}