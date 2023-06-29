export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  modules: ['@nuxtjs/plausible', '@nuxtjs/cloudinary'],
  cloudinary: {
    cloudName: 'nuxt-cloudinary'
  }
})
