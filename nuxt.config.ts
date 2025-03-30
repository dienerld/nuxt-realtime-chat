import process from 'node:process'

export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-11',
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/image',
    'nuxt-svgo',
    '@vueuse/nuxt',
  ],
  runtimeConfig: {
    nodeEnv: process.env.NODE_ENV,
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  css: ['~/assets/css/main.css'],
  svgo: {
    componentPrefix: 'I',
    autoImportPath: '~/assets/svg',
  },
})
