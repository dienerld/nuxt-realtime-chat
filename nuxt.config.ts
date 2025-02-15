import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
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
      apiUrl: 'http://localhost:3333',
    },
  },
  css: ['~/assets/css/main.css'],
  svgo: {
    componentPrefix: 'I',
    autoImportPath: '~/assets/svg',
  },
})
