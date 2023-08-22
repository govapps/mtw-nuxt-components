export default defineNuxtConfig({
  imports: { autoImport: false },

  modules: [
    "@nuxtjs/tailwindcss",
  ],

  components: [
    "components",
    "components/icons",
  ]
});
