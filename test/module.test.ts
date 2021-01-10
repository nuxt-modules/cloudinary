import { expectModuleToBeCalledWith, getNuxt, setupTest } from '@nuxt/test-utils'
import chalk from 'chalk'
import { logger } from '../src/utilties/logger'

logger.mockTypes(() => jest.fn())

describe('module general', () => {
  const mockExtend = jest.fn()

  const config = {
    cloudinary: {
      cloudName: 'demo'
    },
    build: {
      extend: mockExtend
    }
  }

  setupTest({
    config,
    testDir: __dirname,
    fixture: '../testExamples/example'
  })

  beforeEach(() => {
    logger.clear()
  })

  test('should inject plugin', () => {
    expectModuleToBeCalledWith('addPlugin', {
      src: expect.stringContaining('plugin.server.js'),
      fileName: 'cloudinary/plugin.server.js',
      options: {
        cloudName: 'demo',
        privateCdn: false,
        secure: true
      }
    })
  }, 50000)

  test('should inject plugin', () => {
    expectModuleToBeCalledWith('addPlugin', {
      src: expect.stringContaining('plugin.client.js'),
      fileName: 'cloudinary/plugin.client.js',
      options: {
        cloudName: 'demo',
        privateCdn: false,
        secure: true
      }
    })
  }, 50000)

  test('warning for apiKey and apiSecret', () => {
    expect(logger.warn).toHaveBeenCalled()
  })

  it('should add transpile to extend', () => {
    const { options } = getNuxt()
    const config = {
      node: {
        fs: 'hello'
      }
    }

    options.build.extend(config as any, {
      isClient: true
    } as any)

    expect(config.node.fs).toBe('empty')
    expect(mockExtend).toHaveBeenCalled()
  })
})

describe('build.extend', () => {
  const config = {
    cloudinary: {
      cloudName: 'demo'
    },
    build: {
      extend: null
    }
  }

  setupTest({
    config,
    testDir: __dirname,
    fixture: '../testExamples/example'
  })

  it('should add transpile to extend', () => {
    const { options } = getNuxt()
    const config = {
      node: {
        fs: 'hello'
      }
    }

    options.build.extend(config as any, {
      isClient: false
    } as any)

    expect(config.node.fs).toBe('hello')
  })
})

describe('Module with no cloudName', () => {
  const config = {
    cloudinary: {
      cloudName: ''
    }
  }

  setupTest({
    config,
    testDir: __dirname,
    fixture: '../testExamples/example'
  })

  test('error for cloudName', () => {
    expect(logger.error).toHaveBeenNthCalledWith(1, `You need to provide ${chalk.yellow('cloudName')} to set up Cloudinary. See 👉 https://cloudinary.com/documentation/how_to_integrate_cloudinary for more info.`)
  })
})
