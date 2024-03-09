/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Alice', 'Arial', 'sans-serif'],
        new: ['Bebas Neue', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      colors : {
        main : '#0891b2'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui")
  ],
}