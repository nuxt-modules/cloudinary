const { createBrowser } = require('tib')
const { setup, loadConfig, url } = require('@nuxtjs/module-test-utils')

describe('plugin', () => {
  let nuxt, browser, page

  beforeAll(async () => {
    ({ nuxt } = (await setup(loadConfig(__dirname, '../../testExamples/example2'))))
    browser = await createBrowser('puppeteer')
    page = await browser.page(url('/'))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
    await browser.close()
  })

  test('$cloudinary.image.url', async () => {
    const url = await page.runScript(() => window.$nuxt.$cloudinary.image.url('example'))

    expect(url).toEqual('https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/example')
  })

  test('$cloudinary.image.url', async () => {
    const url = await page.runScript(() => window.$nuxt.$cloudinary.image.url('example', {
      width: 200,
      crop: 'scale'
    }))

    expect(url).toEqual('https://res.cloudinary.com/demo/image/upload/c_scale,f_auto,q_auto,w_200/example')
  })

  test('$cloudinary.image.fetchRemote', async () => {
    const url = await page.runScript(() => window.$nuxt.$cloudinary.image.fetchRemote('https://example.com', {
      width: 200,
      crop: 'scale'
    }))

    expect(url).toEqual('https://res.cloudinary.com/demo/image/fetch/c_scale,f_auto,q_auto,w_200/https://example.com')
  })

  test('$cloudinary.image.fetchRemote', async () => {
    const url = await page.runScript(() => window.$nuxt.$cloudinary.image.fetchRemote('https://example.com'))

    expect(url).toEqual('https://res.cloudinary.com/demo/image/fetch/f_auto,q_auto/https://example.com')
  })

  test('$cloudinary.video.url', async () => {
    const url = await page.runScript(() => window.$nuxt.$cloudinary.video.url('example'))

    expect(url).toEqual('https://res.cloudinary.com/demo/video/upload/f_auto,q_auto/example')
  })
})
