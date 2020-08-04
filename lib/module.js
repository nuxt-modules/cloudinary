const { resolve } = require('path')
const logger = require('./utilities/log')
// const cloudinary = require('cloudinary')

module.exports = function (moduleOptions) {
  // Get configuration options from Cloudinary
  const options = {
    ...(this.options.cloudinary || {}),
    ...(moduleOptions || {})
  }

  if (!options.cloudName) {
    logger.error('You need to provide cloudName to set up Cloudinary. See 👉 https://cloudinary.com/documentation/how_to_integrate_cloudinary for more info.')
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'cloudinary/plugin.js',
    options
  })
}

module.exports.meta = require('../package.json')
