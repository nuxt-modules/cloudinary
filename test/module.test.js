const { join } = require('path')
const { setup, get } = require('@nuxtjs/module-test-utils')
const logger = require('@/utilities/logger')
const cloudinaryModule = require('..')

logger.mockTypes(() => jest.fn())
const rootDir = join(__dirname, '..', 'testExamples/example')

describe('module', () => {
  let nuxt

  beforeAll(async () => {
    const config = {
      rootDir,
      modules: [
        cloudinaryModule
      ],
      cloudinary: {}
    }

    nuxt = (await setup(config)).nuxt
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  beforeEach(() => {
    logger.clear()
  })

  test('render', async () => {
    const html = await get('/')
    expect(html).toContain('Works!')
  })

  test('warning for apiKey and apiSecret', () => {
    expect(logger.warn).not.toHaveBeenCalled()
  })

  test('error for cloudName', () => {
    expect(logger.error).toHaveBeenNthCalledWith(1, 'You need to provide cloudName to set up Cloudinary. See 👉 https://cloudinary.com/documentation/how_to_integrate_cloudinary for more info.')
  })
})
