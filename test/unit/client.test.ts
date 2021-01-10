import { ClientApi } from '../../src/cloudinary/client'

describe('ClientApi', () => {
  const instance = new ClientApi({
    cloudName: 'demo',
    privateCdn: false
  })

  it('should contain base features', () => {
    expect(instance.image).not.toBeUndefined()
    expect(instance.video).not.toBeUndefined()
  })

  describe('ClientApi.upload', () => {
    const mockFetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        public_id: 'example'
      })
    }))

    beforeEach(() => {
      global.fetch = mockFetch
    })

    afterEach(() => {
      ;(global.fetch as any).mockClear()
      delete (global as any).fetch
    })

    it('should upload asset', async () => {
      const instance = new ClientApi({
        cloudName: 'demo',
        privateCdn: false
      })

      const asset = await instance.upload('example')

      expect(asset).toEqual({
        public_id: 'example'
      })
    })

    it('should upload asset with callback', async () => {
      const instance = new ClientApi({
        cloudName: 'demo',
        privateCdn: false
      })

      const callbackMock = jest.fn()

      await instance.upload('example', {}, callbackMock)

      expect(callbackMock).toBeCalledWith(null, {
        public_id: 'example'
      })
    })

    it('should return error on callback', async () => {
      const instance = new ClientApi({
        cloudName: 'demo',
        privateCdn: false
      })

      const err = new Error('test error')

      mockFetch.mockImplementationOnce(() => Promise.reject(err))

      const callbackMock = jest.fn()

      await instance.upload('example', {}, callbackMock)

      expect(callbackMock).toBeCalledWith(err, null)
    })
  })
})
