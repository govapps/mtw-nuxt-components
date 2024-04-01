/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  // important: true,
  theme: {
    extend: {
      colors: {
        "primary-200": "#d4e2ee",
        "primary-400": "#51a0e2",
        "primary-500": "#4299e1",
        "primary-600": "#51a0e2",
        "primary-700": "#258be0",
        "primary-800": "#1080de",

        "secondary-500": "#1f2937"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
