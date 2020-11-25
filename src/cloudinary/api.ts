import { CloudConfig, buildImageUrl, CldOptions, buildVideoUrl, TransformerOption, TransformerVideoOption, STORAGE_TYPES } from 'cloudinary-build-url'
import { ImageElement, VideoElement } from './element'

/**To support until deprecate */
export interface CldOptionsImageLegacy extends CloudConfig, TransformerOption{}
export interface CldOptionsVideoLegacy extends CloudConfig, TransformerVideoOption{}

//TODO: 
/**
 * 1. Map legacy APIs to new APIs (only need to map options to transformations and clouds)
 * 2. Unit test
 * 3. Upload/resources/explicit
 * 4. Revert back to Cloudinary-core until build-url is stable?
 */

export class CloudinaryApi {
  private readonly _config: CloudConfig

  constructor(config: CloudConfig = {}) {
    this._config = config
    }

    config(config: CloudConfig = {}) {
    return new CloudinaryApi({
      ...this._config,
      ...config
    })
  }

  get image():ImageApi{
    const url = (publicId: string, options: CldOptions | CldOptionsImageLegacy = {}):string => { return buildImageUrl(publicId, options as CldOptions)} 
    const element = (publicId: string, options: CldOptions | CldOptionsImageLegacy = {}):ImageElement => { 
      return new ImageElement(publicId, options as CldOptions)
    }
    const fetchRemote = (publicId: string, options: CldOptions | CldOptionsImageLegacy = {}):string => { 
      
      return buildImageUrl(publicId, {
      cloud: {
        ...options,
        storageType: STORAGE_TYPES.FETCH
      },
      transformations: (options as CldOptions).transformations
      })
    } 

    return {
      url,
      element,
      fetchRemote
    }
  }
  get video(): VideoApi {
  const url = (publicId: string, options: CldOptions | CldOptionsImageLegacy = {}):string => { return buildImageUrl(publicId, options as CldOptions)} 
  const thumbnail = (publicId: string, options: CldOptions | CldOptionsImageLegacy = {}):string => { return buildImageUrl(publicId, options as CldOptions) }
  const element = (publicId: string, options: CldOptions | CldOptionsImageLegacy = {}):VideoElement => { return new VideoElement(publicId, options as CldOptions)}

  return {
    url,
    thumbnail,
    element
  }
    
  }
}

export type ImageApi = {
  url: typeof buildImageUrl,
  element: (publicId: string, options: CldOptions) => Object,
  fetchRemote: typeof buildImageUrl
}

export type VideoApi = {
  url: typeof buildVideoUrl,
  element: (publicId: string, options: CldOptions) => Object,
  thumbnail: typeof buildImageUrl //return object
}

export default CloudinaryApi