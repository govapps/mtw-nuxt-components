import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  imports: { autoImport: false },

  css: ["~/assets/css/style.css"],

  modules: [
    "@nuxt/ui",
  ],

  components: [
    "~/components",
    "~/components/icons",
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
