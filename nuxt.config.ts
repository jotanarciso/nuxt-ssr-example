// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "azion",
    serveStatic: true,
    compressPublicAssets: true,
  },
  compatibilityDate: "2024-03-30",
  devtools: { enabled: true },
});
