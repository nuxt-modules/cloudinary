import { useRuntimeConfig } from '#imports'
import { constructCloudinaryUrl, ConstructUrlProps } from '@cloudinary-util/url-loader'
import nuxtPkg from 'nuxt/package.json';
import pkg from '../../../package.json'

export const useCldImageUrl = (props: ConstructUrlProps) => {
  if (!props.options.src) console.error("`[@nuxtjs/cloudinary]`: Property `src` is missing")

  const cldCloudName = props.config?.cloud?.cloudName || useRuntimeConfig().public.cloudinary.cloudName

  if (!cldCloudName) console.warn('`[@nuxtjs/cloudinary]` Environment variable `CLOUDINARY_CLOUD_NAME` or property `cloudinary.cloudName` missing')

  return {
    url: constructCloudinaryUrl({
      options: {
        // Have to spread the options because otherwise getting the error about props being updated while they are readonly.
        ...props.options
      },
      config: {
        ...props.config,
        cloud: {
          cloudName: cldCloudName
        }
      },
      analytics: Object.assign({
        sdkCode: 'D',
        sdkSemver: pkg.version,
        techVersion: nuxtPkg,
        product: 'B'
      }, props.analytics)
    })
  }
}
