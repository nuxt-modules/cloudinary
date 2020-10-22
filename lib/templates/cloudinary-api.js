const sdk = require('cloudinary-core')

/** istanbul ignore file */
const basicOptimizations = {
  quality: 'auto',
  fetch_format: 'auto'
}

const getTransformationOptions = (options = {}) => {
  return {
    ...basicOptimizations,
    ...options
  }
}

/**
 * Delivery types - https://cloudinary.com/documentation/image_transformations#delivery_types
 * @enum {DeliveryType}
 */
const DELIVERY_TYPES = {
  UPLOAD: 'upload',
  PRIVATE: 'private',
  AUTHENTICATED: 'authenticated',
  FETCH: 'fetch',
  MULTI: 'multi'  
}

/**
 * @typedef {Object} Asset
 * @property {String} public_id - indicate asset's public identifier
 * @property {String} asset_id - indicate asset's hashed id
 * @property {String} format - original format
 * @property {String} secure_url - delivery url using https
 * @property {String} url - delivery url using http
 * @property {DeliveryType} type - asset's delivery type 
 * @property {String} version - indicate the current version of the asset
 * @property {Number} height - indicate requested asset's height
 * @property {Number} width - indicate requested asset's width
 * @property {Array<Object>} eager - pre-generate assets based on the eager transformations passed
 * @property {Boolean} placeholder - indicate whether there is a placeholder generated
 * @property {Array} tags - indicate all the tags assigned to the asset
 * @property {String} original_filename - indicate the original filename when uploading
 * @property {Boolean} overwritten - indicate whether it is overwritten (for upload)
 */


class CloudinaryApi {
  constructor(configurations) {
    this._configurations = sdk.Util.withSnakeCaseKeys(configurations)

    const cld = new sdk.Cloudinary(this._configurations)

    this.image = {
      /**
       * Generate URL for an image based on the transformation
       * @param {String} publicId - public id (Cloudinary path) of the target image
       * @param {Object} options - optional, transformation options to apply to the target image
       * @returns {string} Returns the optimized delivery URL for the target image
      */    
      url: (publicId, options = {}) => {
        return cld.url(publicId, getTransformationOptions(options))
      },
      /**
       * Generate HTML Element tag for an image with transformation
       * @param {String} publicId - public id (Cloudinary path) of the target image
       * @param {Object} options - optional, transformation options to apply to the target image
       * @returns {Object}
       */
      element: (publicId, options = {}) => {
        return cld.imageTag(publicId, getTransformationOptions(options))
      },
      /**
       * 
       * @param {String} url - the original URL of the target image
       * @param {Object} options - optional, transformation options to apply to the target image
       * @returns {string} Returns the optimized delivery URL for the target image
       */
      fetchRemote: (url, options = {}) => {
        return cld.url(url, getTransformationOptions({ ...options, type: 'fetch' }))
      }
    }  

    this.video = {
      /**
       * Generate URL for a video based on the transformation
       * @param {String} publicId - public id (Cloudinary path) of the target video
       * @param {Object} options - optional, transformation options to apply to the target video
       * @returns {string} Returns the optimized delivery URL for the target video
      */  
      url(publicId, options) {
        return cld.video_url(publicId, getTransformationOptions(options))
      },
      /**
       * Generate HTML Element tag for an video with transformation
       * @param {String} publicId - public id (Cloudinary path) of the target video
       * @param {Object} options - optional, transformation options to apply to the target video
       * @returns {Object}
       */
      element(publicId, options) {
        return cld.videoTag(publicId, getTransformationOptions(options))
      },
      /**
       * Generate thumbnail image of a video based on transformations
       * @param {String} publicId - public id (Cloudinary path) of the target video
       * @param {Object} options - optional, transformation options to apply to the target video's thumbnail
       * @returns {Object} - { url } contains the delivery url of the generated thumbnail
       */
      thumbnail(publicId, options) {
        const transformations = getTransformationOptions(options)

        return {
          url: cld.video_thumbnail_url(publicId, transformations),
        }
      } 
    }
  }
  /**
   * Returns a new instance of cloudinary module for chaining
   * @param {Object} configurations - New configurations for cloudinary sdk
   * @returns {CloudinaryApi} new instance of cloudinary module 
   */
  config(options = {}) {
    const updatedInstance = new CloudinaryApi({
      ...this._configurations,
      ...sdk.Util.withSnakeCaseKeys(options)
    })

    return updatedInstance
  }
  /**
   * Returns a Promise from the upload process for an asset on Server side
   * @param {String} file - path to the asset you wish to upload 
   * @param {Options} options - upload options (optional): https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters
   * @param {Function} callback - callback handler (optional)
   * @returns {Promise<Asset> | Promise<{ msg: {String} }>}
   */
  upload(file, options = {}, callback) {
    const $options = sdk.Util.withSnakeCaseKeys(options)

    if (!$options.api_key && !this._configurations.api_key
      && !$options.api_secret && !this._configurations.api_secret) {
      throw new Error('API Key and Secret Key are needed for upload API')
    }

    const cldServer = require('cloudinary').v2

    cldServer.config(this._configurations)

    const uploader = cldServer.uploader

    return uploader.upload(file, $options, callback)
  }
  /**
   * 
   * @param {String} publicId - the public id of the target asset
   * @param {{ type: {DeliveryType} }} options - options to apply on the asset : https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters-6
   * @returns {Asset | null} 
   */
  async explicit(publicId, options = {}) {
    const $options = sdk.Util.withSnakeCaseKeys(options)

    if (!$options.api_key && !this._configurations.api_key
      && !$options.api_secret && !this._configurations.api_secret) {
      throw new Error('API Key and Secret Key are needed for explicit API')
    }

    const cldServer = require('cloudinary').v2

    cldServer.config(this._configurations)

    const uploader = cldServer.uploader

    try {
      const asset = await uploader.explicit(publicId, $options)

      return asset
    } catch (error) {
      return null
    }
  }
}

module.exports = CloudinaryApi

module.exports.DELIVERY_TYPES = DELIVERY_TYPES

module.exports.withSnakeCaseKeys = sdk.Util.withSnakeCaseKeys