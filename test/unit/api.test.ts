import CloudinaryApi, { getTransformationOptions } from '../../src/cloudinary/api'

describe('CloudinaryApi', () => {
  const instance = new CloudinaryApi({
    cloudName: 'demo',
    privateCdn: false
  })

  it('should create CloudinaryApi with snake_case config', () => {
    expect(instance.configurations).toEqual({
      cloud_name: 'demo',
      private_cdn: false,
      secure: true
    })
  })

  it('should create CloudinaryApi with image & video instance', () => {
    expect(Object.keys(instance.image)).toEqual(['url', 'element', 'fetchRemote'])
    expect(Object.keys(instance.video)).toEqual(['url', 'element', 'thumbnail'])
  })

  it('should return new inherited instance when calling config()', () => {
    const newInst = instance.config({
      cloudName: 'maya',
      secure: false
    })

    expect(newInst.configurations).toEqual({
      cloud_name: 'maya',
      private_cdn: false,
      secure: false
    })

    expect(instance.configurations).toEqual({
      cloud_name: 'demo',
      private_cdn: false,
      secure: true
    })
  })

  describe('CloudinaryApi.image', () => {
    describe('url()', () => {
      it('should return image url with default options', () => {
        expect(instance.image.url('example', {})).toEqual('https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/example')
      })

      it('should return modified image', () => {
        expect(instance.image.url('example', {
          width: 200,
          crop: 'scale'
        })).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,f_auto,q_auto,w_200/example')
      })
    })

    describe('fetchRemote()', () => {
      it('should return fetch url with default options', () => {
        expect(instance.image.fetchRemote('https://example.com', {})).toEqual('https://res.cloudinary.com/demo/image/fetch/f_auto,q_auto/https://example.com')
      })
    })

    describe('element()', () => {
      it('should return image tag', () => {
        const element = instance.image.element('example', {})
        expect(element).toHaveProperty('name', 'img')
        expect(element).toHaveProperty('publicId', 'example')
      })
    })
  })

  describe('CloudinaryApi.video', () => {
    describe('url()', () => {
      it('should return image url with default options', () => {
        expect(instance.video.url('example', {})).toEqual('https://res.cloudinary.com/demo/video/upload/f_auto,q_auto/example')
      })

      it('should return modified image', () => {
        expect(instance.video.url('example', {
          width: 200,
          crop: 'scale'
        })).toBe('https://res.cloudinary.com/demo/video/upload/c_scale,f_auto,q_auto,w_200/example')
      })
    })

    describe('thumbnail()', () => {
      it('should return fetch url with default options', () => {
        expect(instance.video.thumbnail('example', {})).toEqual({
          url: 'https://res.cloudinary.com/demo/video/upload/f_auto,q_auto/example.jpg'
        })
      })
    })

    describe('element()', () => {
      it('should return video tag', () => {
        const element = instance.video.element('example', {})
        expect(element).toHaveProperty('name', 'video')
        expect(element).toHaveProperty('publicId', 'example')
      })
    })
  })
})

describe('getTransformationOptions()', () => {
  it('should return default options if no input', () => {
    expect(getTransformationOptions()).toEqual({
      quality: 'auto',
      fetch_format: 'auto'
    })
  })

  it('should return merged options', () => {
    expect(getTransformationOptions({
      resize: {
        width: 100
      },
      fetch_format: 'png'
    })).toEqual({
      resize: {
        width: 100
      },
      quality: 'auto',
      fetch_format: 'png'
    })
  })
})
