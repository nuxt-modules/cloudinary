<script setup lang="ts">
import { ref } from 'vue'
import { Image } from '@unpic/vue'
import type {
  ConstructUrlProps,
  ImageOptions,
  ConfigOptions,
} from '@cloudinary-util/url-loader'
import { pollForProcessingImage } from '@cloudinary-util/util'
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
  const eventPayload = payload.target as EventTarget & { src: string }
  const result = await pollForProcessingImage(eventPayload)

  if (result) imgKey.value = `${imgKey.value}-${Math.random()}`
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
