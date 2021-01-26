export default {
  components: true,
  target: 'static',
  modules: [
    '../src/index.ts'
  ],
  buildModules: [
    '@nuxt/typescript-build'
  ],
  cloudinary: {
    cloudName: 'demo',
    useComponent: true
  }
}
