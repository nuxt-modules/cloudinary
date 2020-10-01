const sdk = require('cloudinary-core')

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

class CloudinaryApi {
  constructor(configurations) {
    this._configurations = configurations

    const cld = new sdk.Cloudinary(configurations)

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
          element: cld.video_thumbnail(publicId, transformations)
        }
      } 
    }
  }
  /**
   * Returns a new instance of cloudinary module for chaining
   * @param {Object} configurations - New configurations for cloudinary sdk
   * @returns {CloudinaryApi} new instance of cloudinary module 
   */
  config(configurations = {}) {
    const updatedInstance = new CloudinaryApi({
      ...this._configurations,
      ...configurations
    })

    return updatedInstance
  }
  /**
   * Returns a Promise from the upload process for an asset on Server side
   * @param {String} file - path to the asset you wish to upload 
   * @param {Options} options - upload options (optional): https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters
   * @param {Function} callback - callback handler (optional)
   * @returns {Promise}
   */
  upload(file, options, callback) {
    const cldServer = require('cloudinary').v2

    cldServer.config(this._configurations)

    const uploader = cldServer.uploader

    return uploader.upload(file, options, callback)
  }
}

module.exports = CloudinaryApi