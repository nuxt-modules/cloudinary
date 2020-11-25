import { buildImageUrl, buildVideoUrl, CldOptions } from 'cloudinary-build-url'
import { Actions } from './actions'

export type MediaElementType = 'img' | 'video'

abstract class Element {
  name: 'img' | 'video'
  options: CldOptions = { transformations: {} }
  publicId: string
  constructor(publicId: string, elementName: MediaElementType, options: CldOptions = { cloud: {}, transformations: {}}) {
    this.publicId = publicId
    this.name = elementName
    this.options = options
  }
  transformation() {
    return new Actions((this.options || {}).transformations)
  }
  abstract toHtml():string
  toDOM():HTMLElement {
    if (!document || !document.createElement) {
      throw new Error('This function only works on browser!')
    }

    const element:HTMLImageElement | HTMLVideoElement = document.createElement(this.name)
    const src = this.name === 'video' ? buildVideoUrl(this.publicId, this.options) : buildImageUrl(this.publicId, this.options)

    element.setAttribute('src', src)

    return element
  }
}

export class ImageElement extends Element {
  constructor(publicId: string, options?: CldOptions) {
    super(publicId, 'img', options)
  }
  toHtml():string { 
    const src = buildImageUrl(this.publicId, this.options)

    return `<${this.name} src="${src}">`
  }
}

export class VideoElement extends Element {
  constructor(publicId: string, options?: CldOptions) {
    super(publicId, 'video', options)
  }
  toHtml():string { 
    return  ''
  }
}

