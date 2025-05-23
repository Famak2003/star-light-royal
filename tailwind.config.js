/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // include this if using the App Router
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003366",
        secondary: "#00509E",
        accent: "#4F46E5",
        textColor: "#666666",
        headerColor: "#202C45",
        hightlight: "#4F46E5",
        b_divider: "#d1d5db",
      },
      screens: {
        mobile: "450px",
        tab: "950px"
      },
      maxWidth: {
        'mx-width': "1170px"
      },
      boxShadow: {
        custom_shadow1: '-7px -8px 23px 10px rgba(0,0,0,0.2) inset',
      }
    },
  },
  plugins: [],
};
