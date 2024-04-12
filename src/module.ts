import { fileURLToPath } from 'node:url'
import {
  defineNuxtModule,
  createResolver,
  addImportsDir,
  addComponentsDir,
} from '@nuxt/kit'
import { defu } from 'defu'
import type { ConfigOptions } from '@cloudinary-util/url-loader'

export type ModuleOptions = {
  cloudName?: string
  uploadPreset?: string
  apiKey?: string
  analytics?: boolean
  cloud?: ConfigOptions['cloud']
  url?: ConfigOptions['url']
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/cloudinary',
    configKey: 'cloudinary',
  },
  defaults: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    analytics: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.cloudinary = defu(
      nuxt.options.runtimeConfig.public.cloudinary,
      {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || options.cloudName,
        uploadPreset:
          process.env.CLOUDINARY_UPLOAD_PRESET || options.uploadPreset,
        apiKey: process.env.CLOUDINARY_API_KEY || options.apiKey,
        analytics: options.analytics,
        cloud: options.cloud,
        url: options.url,
      },
    )

    if (!nuxt.options.runtimeConfig.public.cloudinary?.cloudName)
      console.warn(
        '`[@nuxtjs/cloudinary]` Environment variable `CLOUDINARY_CLOUD_NAME` or property `cloudinary.cloudName` missing',
      )

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addImportsDir(resolver.resolve(runtimeDir, 'composables'))
    addComponentsDir({
      path: resolver.resolve(runtimeDir, 'components'),
      pathPrefix: false,
      prefix: '',
      priority: 999,
      global: true,
    })
  },
})
