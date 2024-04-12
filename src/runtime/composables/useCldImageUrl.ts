import type { ConstructUrlProps } from '@cloudinary-util/url-loader'
import { constructCloudinaryUrl } from '@cloudinary-util/url-loader'
import nuxtPkg from 'nuxt/package.json'
import pkg from '../../../package.json'
import { useRuntimeConfig } from '#imports'

export const useCldImageUrl = (props: ConstructUrlProps) => {
  if (!props.options.src) console.error('`[@nuxtjs/cloudinary]`: Property `src` is missing')

  const moduleConfig = useRuntimeConfig().public.cloudinary

  // There are a few ways to pass in the Cloud Name
  // - Component/composable config prop
  // - Top level module config
  // - Top level module config cloud property
  // While the top level module config is redundant, retaining it for convenience as most
  // users won't need to pass in more advanced settings via the `cloud` property

  const cldCloudName = props.config?.cloud?.cloudName || moduleConfig.cloud?.cloudName || moduleConfig?.cloudName

  if (!cldCloudName) console.warn('`[@nuxtjs/cloudinary]` Environment variable `CLOUDINARY_CLOUD_NAME` or property `cloudinary.cloudName` missing')

  let cldOptions: ConstructUrlProps = {
    options: {
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
