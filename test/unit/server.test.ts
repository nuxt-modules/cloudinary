import { ServerApi } from '../../src/runtime/server'

describe('ServerApi', () => {
  const instance = new ServerApi({
    cloudName: 'demo',
    privateCdn: false
  })

  it('should contain base features', () => {
    expect(instance.image).not.toBeUndefined()
    expect(instance.video).not.toBeUndefined()
  })

  describe('ServerApi.upload', () => {
    const mockUpload = jest.fn(() => ({ public_id: 'hello' }))
    const mockExplicit = jest.fn(() => ({ public_id: 'hello2' }))
    const mockConfig = jest.fn()

    beforeAll(() => {
      jest.mock('cloudinary', () => ({
        v2: {
          config: mockConfig,
          uploader: {
            upload: mockUpload,
            explicit: mockExplicit
          }
        }
      }))
    })

    it('should trigger upload', () => {
      instance.upload('test')

      expect(mockUpload).toBeCalled()
      expect(mockConfig).toBeCalledWith({
        cloud_name: 'demo',
        private_cdn: false,
        secure: true
      })
    })

    it('should trigger explicit function', () => {
      instance.explicit('test')

      expect(mockExplicit).toBeCalled()
      expect(mockExplicit).toBeCalledWith('test', {})
      expect(mockConfig).toBeCalledWith({
        cloud_name: 'demo',
        private_cdn: false,
        secure: true
      })
    })

    afterAll(() => {
      jest.clearAllMocks()
    })
  })
})
