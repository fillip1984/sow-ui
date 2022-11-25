/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#2667ff",
      secondary: "#3f8efc",
      lite: "#dce1e9",
      grey: "#526760",
      dark: "#374b4a",
      white: "#fff",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
