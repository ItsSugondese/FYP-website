/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        customPrimary: '#A62A22',
        customTypeBg: 'bg-blue-200',
        nonSelectedFoodFilterBg: '#FAE7E6',
        priceColor: '#15803D',
        typeColor: '#BBDEFB'
      }
    },
  },
  plugins: [],
}

