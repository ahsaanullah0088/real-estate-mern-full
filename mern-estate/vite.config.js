/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  server:{
   proxy:{
    '/api' : 'http://localhost:3000',
    secure:false,
   },
  },
  theme: {
    extend: {},
  },
  plugins: [],
}