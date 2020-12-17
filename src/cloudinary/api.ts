import type { CloudConfig } from '@cld-apis/types'
import { STORAGE_TYPES } from '@cld-apis/utils'
import { ImageTag, VideoTag, Cloudinary, Util } from 'cloudinary-core'

const basicOptimizations = {
  quality: 'auto',
  fetch_format: 'auto'
}

export const getTransformationOptions = (options = {}) => {
  return {
    ...basicOptimizations,
    ...options
  }
}

export type ImageApi = {
  url: (publicId: string, options) => string,
  element: (publicId: string, options) => ImageTag,
  fetchRemote: (publicId: string, options) => string
}

export type VideoThumbnail = {
  url: string
}

export type VideoApi = {
  url: (publicId: string, options) => string,
  element: (publicId: string, options) => VideoTag,
  thumbnail: (publicId: string, options) => VideoThumbnail
}

export class CloudinaryApi {
  private readonly _config: CloudConfig
  public readonly image: ImageApi
  public readonly video: VideoApi

  constructor (config: CloudConfig = {}) {
    this._config = Util.withSnakeCaseKeys({
      secure: true,
      ...config
    })

    const cld = new Cloudinary(this._config as any)

    this.image = {
      url: (publicId: string, options:Object = {}):string => cld.url(publicId, getTransformationOptions(options)),
      element: (publicId: string, options:Object = {}):ImageTag => cld.imageTag(publicId, getTransformationOptions(options)),
      fetchRemote: (url: string, options:Object = {}):string => cld.url(url, getTransformationOptions({ ...options, type: STORAGE_TYPES.FETCH }))
    }

    this.video = {
      url: (publicId: string, options:Object = {}):string => cld.video_url(publicId, getTransformationOptions(options)),
      element: (publicId: string, options:Object = {}):VideoTag => cld.videoTag(publicId, getTransformationOptions(options)),
      thumbnail: (publicId: string, options:Object = {}):VideoThumbnail => ({ url: cld.video_thumbnail_url(publicId, getTransformationOptions(options)) })
    }
  }

  config (config: CloudConfig = {}) {
    return new CloudinaryApi({
      ...this._config,
      ...Util.withSnakeCaseKeys(config)
    })
  }

  get configurations ():CloudConfig {
    return this._config
  }
}

export default CloudinaryApi
