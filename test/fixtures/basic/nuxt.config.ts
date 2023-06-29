import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  cloudinary: {
    cloudName: 'nuxt-cloudinary',
  }
})
