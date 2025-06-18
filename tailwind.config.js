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
        light_grey: "#595959",
        dark: "#171717",
        dark_side: "#212121e6",
        primary_light_grey: "#FaFaFa",
        secondary_light_grey: "#706F6F",
        blue_head: "#67c5dc",
        primary_black: "#000",
        white: "#fff",
        navDark: "#1e293b",
        deep_red: "#E51E25",
        cool_red: "#E40613",
        base_yellow: "#D7DD17",
        light_gray: "#c7c7c7",
        text_light_gray: "#bebebe",
        base_gray: "#757575",
        body_bg: "#fafafa",
        secondary_gray: "#585858",
        section_bg: "#F5F5F5",
        dark_yellow: "#6C6F00",
        light_dark_yellow: "#9B9F00",
        dark_gray: "#4A4B4D",
        faint_gray: "#BBBBBB",
        pale_yellow: "#FAFBD4"
      },
      screens: {
        "xl": "1240px",
        "lmd": "850px",
        "tab": "950px",
        "ltab": "1100px",
        "xxl": "1210px",
        "3xl": "1380px",
        "lmobile": "550px",
        "mobile": "450px",
        "xs": "350px"
      },
      maxWidth: {
        'mx-width': '1170px',
      },
      boxShadow: {
        custom_shadow1: '-7px -8px 23px 10px rgba(0,0,0,0.2) inset',
        custom_shad2: "rgb(88, 88, 88, 0.25) 0px -12px 10px, rgb(88, 88, 88, 0.22) 0px -12px 10px",
        custom_shad3: " 0px -11px 18px -4px, rgba(88, 88, 88, 1)",
        custom_shad4: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
        custom_shad5: " rgba(0, 0, 0, 0.35) 0px 0px 5px 0px",
        custom_shad6: " rgba(255, 255, 255, 0.35) 0px 0px 5px 0px",
        custom_shad7: " rgba(255, 255, 255, 0.35) 0px 3px 5px 0px",
      }
    },
  },
  plugins: [],
  darkMode: 'class'
};
