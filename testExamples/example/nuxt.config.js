const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [{ handler: require('../../src/index.ts').default }],
  cloudinary: {
    cloudName: 'demo'
  },
  build: {
    extend () {}
  }
}
