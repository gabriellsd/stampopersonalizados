/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores da logo STAMPÔ! — versão refinada (mais harmonia e leitura)
        brand: {
          purple: '#5e2d7e',
          'purple-light': '#f8f5fa',
          'purple-dark': '#3e1f54',
          orange: '#e8920d',
          'orange-light': '#fefbf5',
        },
      },
    },
  },
  plugins: [],
}
