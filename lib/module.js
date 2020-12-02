const { resolve } = require('path')
const logger = require('./utilities/logger')
const { ServerApi } = require('./templates/cloudinary-api')

module.exports = function (moduleOptions) {
  // Get configuration options from Cloudinary
  const options = {
    ...(this.options.cloudinary || {}),
    ...(moduleOptions || {})
  }

  if (!options.cloudName) {
    logger.error('You need to provide cloudName to set up Cloudinary. See 👉 https://cloudinary.com/documentation/how_to_integrate_cloudinary for more info.')
    return
  }

  const build = this.nuxt.options.build
  const extend = build.extend ? build.extend : () => {}

  build.extend = (config, ctx) => {
    if (ctx.isClient) {
      config.node = {
        fs: 'empty'
      }
    }

    extend(config, ctx)
  }

  const configurations = {
    cloud_name: options.cloudName,
    private_cdn: options.privateCDN || false,
    secure: options.secure === undefined ? true : options.secure,
    api_key: options.apiKey,
    api_secret: options.apiSecret,
    secure_distribution: options.secureDistribution,
    cname: options.cname
  }

  const $cloudinary = new ServerApi(configurations)

  this.nuxt.hook('vue-renderer:context', (ssrContext) => {
    ssrContext.$cloudinary = $cloudinary
  })

  // Add server plugin
  this.addPlugin({
    src: resolve(__dirname, 'templates/plugin.server.js'),
    fileName: 'cloudinary/plugin.server.js',
    options
  })

  this.addTemplate({
    src: resolve(__dirname, 'templates/cloudinary-api.js'),
    fileName: 'cloudinary/cloudinary-api.js'
  })

  // Add client plugin
  this.addPlugin({
    src: resolve(__dirname, 'templates/plugin.client.js'),
    fileName: 'cloudinary/plugin.client.js',
    options
  })

  if (!options.apiKey || !options.apiSecret) {
    logger.warn('apiKey and apiSecret will be needed to set up upload to Cloudinary on build and hook. See 👉 https://cloudinary.com/documentation/how_to_integrate_cloudinary for more info.')
  }

  module.exports.$cloudinary = $cloudinary
}

module.exports.meta = require('../package.json')
