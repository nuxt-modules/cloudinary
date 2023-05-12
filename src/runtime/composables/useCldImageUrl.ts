import { useRuntimeConfig } from '#imports'
import { constructCloudinaryUrl, AssetOptions } from '@cloudinary-util/url-loader'

export const useCldImageUrl = (options: AssetOptions, cloudName?: string) => {
  if (!options.src) console.error("`@nuxtjs/cloudinary`: Property `src` is missing")

  const cldCloudName = cloudName || useRuntimeConfig().public.cloudinary.cloudName

  // Have to spread the options because otherwise getting the error about props being updated while they are readonly.
  const imageOptions = { ...options }

  return {
    url: constructCloudinaryUrl({
      options: imageOptions,
      config: {
        cloud: {
          cloudName: cldCloudName
        }
      }
    })
  }
}
