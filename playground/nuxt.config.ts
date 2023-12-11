export default defineNuxtConfig({
  modules: ['../src/module'],
  cloudinary: {
    cloudName: 'nuxt-cloudinary',
    analytics: false
  }
})
