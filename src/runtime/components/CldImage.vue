<script setup lang="ts">
import { ref } from 'vue'
import { Image } from '@unpic/vue'
import type {
  ConstructUrlProps,
  ImageOptions,
  ConfigOptions,
} from '@cloudinary-util/url-loader'
import { useCldImageUrl } from '../composables/useCldImageUrl'

export interface CldImageProps extends ImageOptions {
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  // Adding below as required props to promote good patterns in developing images
  alt: string
  width: string | number
  height: string | number
  config?: ConfigOptions
  // Unpic props
  layout?: 'constrained' | 'fullWidth' | 'fixed'
  priority?: boolean
  background?: 'auto' | string
}

const props = defineProps<CldImageProps>()

const { config, ...options } = props

const { url } = useCldImageUrl({ options, config } as ConstructUrlProps)

const transformUrl = () => {
  const options = {
    ...props,
  }

  options.width
    = typeof options.width === 'string'
      ? Number.parseInt(options.width)
      : options.width
  options.height
    = typeof options.height === 'string'
      ? Number.parseInt(options.height)
      : options.height

  const { url } = useCldImageUrl({ options, config } as ConstructUrlProps)

  return url
}

const imgKey = ref('image-key')

const handleError = async (payload: Event) => {
  const result = await pollForProcessingImage(payload)

  if (result) imgKey.value = `${imgKey.value}-${Math.random()}`
}

const pollForProcessingImage = async (options: Event): Promise<boolean> => {
  const { src } = options.target as EventTarget & { src: string }
  try {
    await new Promise((resolve, reject) => {
      fetch(src).then((res) => {
        if (!res.ok) {
          reject(res)
          return
        }
        resolve(res)
      })
    })
  }
  catch (e: any) {
    if (e.status === 423) {
      return await pollForProcessingImage(options)
    }
    return false
  }
  return true
}
</script>

<template>
  <Image
    :key="imgKey"
    :src="url"
    :layout="layout || 'constrained'"
    :width="width"
    :height="height"
    v-bind="$attrs"
    :alt="alt"
    :priority="priority"
    cdn="cloudinary"
    :transformer="transformUrl"
    @error="handleError"
  />
</template>
