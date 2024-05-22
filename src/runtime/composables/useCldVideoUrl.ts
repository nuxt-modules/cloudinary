import { constructCloudinaryUrl, type ConstructUrlProps, type ConfigOptions, type AnalyticsOptions, type VideoOptions } from '@cloudinary-util/url-loader'
import nuxtPkg from 'nuxt/package.json'
import pkg from '../../../package.json'
import { useRuntimeConfig } from '#imports'

export const useCldVideoUrl = (props: { options: VideoOptions, config?: ConfigOptions, analytics?: AnalyticsOptions }) => {
  if (!props.options.src) console.error('`[@nuxtjs/cloudinary]`: Property `src` is missing')

  const moduleConfig = useRuntimeConfig().public.cloudinary

  const cldCloudName = props.config?.cloud?.cloudName || moduleConfig.cloud?.cloudName || moduleConfig?.cloudName

  if (!cldCloudName) console.warn('`[@nuxtjs/cloudinary]` Environment variable `CLOUDINARY_CLOUD_NAME` or property `cloudinary.cloudName` missing')

  let cldOptions: ConstructUrlProps = {
    options: {
      assetType: 'video',
      format: 'auto:video',
      // Have to spread the options because otherwise getting the error about props being updated while they are readonly.
      ...props.options,
    },
    config: {
      url: moduleConfig.url,
      cloud: {
        cloudName: cldCloudName,
        ...moduleConfig.cloud,
      },
      ...props.config,
    },
    analytics: false,
  }

  if (moduleConfig.analytics) {
    cldOptions = {
      ...cldOptions,
      analytics: Object.assign({
        sdkCode: 'D',
        sdkSemver: `${pkg.version.split('.')[0]}.0.0`,
        techVersion: `${nuxtPkg.version.split('.')[0]}.0.0`,
        product: 'B',
      }, props.analytics),
    }
  }

  return {
    url: constructCloudinaryUrl(cldOptions),
  }
}
