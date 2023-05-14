import { useRuntimeConfig } from '#imports'
import { constructCloudinaryUrl, ConstructUrlProps } from '@cloudinary-util/url-loader'

export const useCldImageUrl = (props: ConstructUrlProps) => {
  if (!props.options.src) console.error("`@nuxtjs/cloudinary`: Property `src` is missing")

  const cldCloudName = props.config?.cloud?.cloudName || useRuntimeConfig().public.cloudinary.cloudName

  return {
    url: constructCloudinaryUrl({
      options: {
        // Have to spread the options because otherwise getting the error about props being updated while they are readonly.
        ...props.options
      },
      config: {
        cloud: {
          cloudName: cldCloudName
        }
      },
      analytics: props.analytics
    })
  }
}
