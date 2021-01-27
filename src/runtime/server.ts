import type { Asset, CloudConfig, ResourceType } from '@cld-apis/types'
import { toSnakeCase } from '@cld-apis/utils'
import { DeliveryType } from 'cloudinary'
import CloudinaryApi from './api'

export type CldError = {
  msg: string
}

export type Options = {
  resourceType?: ResourceType;
  type?: DeliveryType;
  invalidate?: boolean;
}

export type SingleDeleteOptions = Options

export type RenameOptions = Options & {
  toType: DeliveryType;
  overwrite: boolean;
}

export type AccessMode = 'public' | 'authenticated';

export type AccessControlType = 'token' | 'anonymous'

export type AccessControl = {
  type: AccessControlType;
  start?: string;
  end?: string;
}

export type ResponsiveBreakpointOption = {
  createDerived: boolean;
  format?: string;
  transformation?: string;
  maxWidth?: number;
  minWidth?: number;
  bytesStep?: number;
  maxImages?: number
}

export type ResourceDataOptions = {
  tags?: string[]
  context?: string[]
  colors?: boolean
  faces?: boolean;
  qualityAnalysis?: boolean;
  accessibilityAnalysis?: boolean;
  cinemagraphAnalysis?: boolean;
  imageMetadata?: boolean;
  phash?: boolean
  responsiveBreakpoints?: ResponsiveBreakpointOption[]
  autoTagging?: number;
  categorization?: string;
  detection?: string;
  ocr?: string;
  exif?: boolean;
}

export type ManupulationOptions = {
  eager?: string[];
  eageAsync?: boolean;
  eagerNotificationUrl?: string
  transformation?: string
  format?: string;
  customCoordinates?: string[]
  faceCoordinates?: string[]
  backgroundRemoval?: 'cloudinary_ai' | 'pixelz'
  rawConvert?: 'apose' | 'google_speech' | 'extract_text'
}

export type UploadOptions = Options & ManupulationOptions & ResourceDataOptions & {
  publicId?: string;
  folder?: string;
  useFilename?: boolean;
  uniqueFilename?: boolean;
  accessControl?: AccessControl;
  accessMode?: AccessMode;
  discardOriginalFilename?: boolean;
  overwrite?: boolean;
  allowedFormats?: string[];
  async?: boolean;
  backup?: boolean;
  eval?: string;
  headers?: string;
  invalidate?: boolean;
  moderation?: string;
  notificationUrl?: string;
  proxy?: string;
  returnDeleteToken?: boolean;
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
  upload (file: string, options: UploadOptions = {}, callback?: Function):Promise<Asset | CldError> {
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
  explicit (publicId: string, options:Object = {}):Promise<Asset | CldError> {
    return this.resource(publicId, options)
  }

  /**
   *
   * @param {String} publicId - the public id of the target asset
   * @param {{ type: {DeliveryType} }} options - options to apply on the asset : https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters-6
   * @returns {Promise<Asset | CldError | null>}
   */
  async resource (publicId: string, options:Object = {}):Promise<Asset | CldError> {
    const $options = toSnakeCase(options)

    const cldServer = require('cloudinary').v2

    cldServer.config(toSnakeCase(this.configurations))

    const uploader = cldServer.uploader

    const asset:Promise<Asset | CldError> = await uploader.explicit(publicId, $options)

    return asset
  }

  async delete (publicId: string, options: SingleDeleteOptions):Promise<{ result: string } | CldError> {
    const $options = toSnakeCase(options)

    const cldServer = require('cloudinary').v2

    cldServer.config(toSnakeCase(this.configurations))

    const uploader = cldServer.uploader

    const result:Promise<{ result: string } | CldError> = await uploader.destroy(publicId, $options)

    return result
  }

  async rename (currPublicId: string, newPublicId, options: RenameOptions):Promise<Asset | CldError> {
    const $options = toSnakeCase(options)

    const cldServer = require('cloudinary').v2

    cldServer.config(toSnakeCase(this.configurations))

    const uploader = cldServer.uploader

    const asset:Promise<Asset | CldError> = await uploader.rename(currPublicId, newPublicId, $options)

    return asset
  }
}
