import { Asset, CloudConfig } from '@cld-apis/types'
import { toSnakeCase } from '@cld-apis/utils'
import CloudinaryApi from './api'

export type CldError = {
  msg: string
}

export class ServerApi extends CloudinaryApi {
  config (config: CloudConfig = {}) {
    return new ServerApi({
      ...this.configurations,
      ...config
    })
  }

  /**
   * Returns a Promise from the upload process for an asset on Server side
   * @param {String} file - path to the asset you wish to upload
   * @param {Options} options - upload options (optional): https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters
   * @param {Function} callback - callback handler (optional)
   * @returns {Promise<Asset | CldError>}
   */
  upload (file: string, options: Object = {}, callback?: Function):Promise<Asset | CldError> {
    const $options = toSnakeCase(options)

    const cldServer = require('cloudinary').v2

    cldServer.config(toSnakeCase(this.configurations))

    const uploader = cldServer.uploader

    return uploader.upload(file, $options, callback)
  }

  /**
   *
   * @param {String} publicId - the public id of the target asset
   * @param {{ type: {DeliveryType} }} options - options to apply on the asset : https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters-6
   * @returns {Promise<Asset | CldError | null>}
   */
  async explicit (publicId: string, options:Object = {}):Promise<Asset | CldError> {
    const $options = toSnakeCase(options)

    const cldServer = require('cloudinary').v2

    cldServer.config(toSnakeCase(this.configurations))

    const uploader = cldServer.uploader

    const asset:Promise<Asset | CldError> = await uploader.explicit(publicId, $options)

    return asset
  }
}
