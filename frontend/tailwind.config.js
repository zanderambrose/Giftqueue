/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gqp: "#aa96da",
        gqp2: "#aa96da1a",
      },
    },
  },
  plugins: [require("daisyui")],
};
