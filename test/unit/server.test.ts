import { ServerApi } from '../../src/cloudinary/server'

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

    beforeAll(() => {
      jest.mock('cloudinary', () => ({
        v2: {
          config: jest.fn(),
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
    })

    it('should trigger explicit function', () => {
      instance.explicit('test')

      expect(mockExplicit).toBeCalled()
    })

    afterAll(() => {
      jest.clearAllMocks()
    })
  })
})
