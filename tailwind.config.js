/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // colors: {
    //   discord: "#282B30",
    // },
    extend: {
      fontFamily: {
        aboreto: ["Aboreto"],
        oswald: ["Oswald"],
      },
    },
  },
  plugins: [],
};
