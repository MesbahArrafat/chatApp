/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif',],
      },
      colors:{
        primary : '#5F35F5',
        heading : '#11175D',
        secondary : '#B8B9CE',
      }
    },
  },
  plugins: [],
}
