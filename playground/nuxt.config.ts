export default defineNuxtConfig({
  modules: ['../src/module'],
  cloudinary: {
    cloudName: 'nuxt-cloudinary',
    apiKey: '123',
    url: {},
    cloud: {},
  },
})
