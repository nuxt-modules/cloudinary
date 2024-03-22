export default defineNuxtConfig({
  modules: ['../src/module'],
  cloudinary: {
    cloudName: 'nuxt-cloudinary',
    url: {
      cname: 'spacejelly.dev',
      secureDistribution: 'spacejelly.dev',
      secure: true,
      privateCdn: true
    }
  }
})
