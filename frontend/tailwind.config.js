/* * @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        width:{
          '500': '500px',
          '420': '420px',
        },
        boxShadow: {
          '3xl': '5px 5px 0px 0px rgba(0,0,0,0.3)',
          '4xl': '6px 6px 0px 0px rgba(0,0,0,0.5)'
        }
        
      },
    },
    plugins: [],
}

