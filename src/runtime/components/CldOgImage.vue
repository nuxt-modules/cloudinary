<script setup lang="ts">
import { computed } from 'vue'
import type { ConstructUrlProps } from '@cloudinary-util/url-loader'
import { useCldImageUrl } from '../composables/useCldImageUrl'
import type { CldImageProps } from './CldImage.vue'
import { useRouter } from '#imports'

const TWITTER_CARD = 'summary_large_image'
const OG_IMAGE_WIDTH = 2400
const OG_IMAGE_WIDTH_RESIZE = 1200
const OG_IMAGE_HEIGHT = 1254

const { currentRoute } = useRouter()

export type CldOgImageProps = CldImageProps & {
  excludeTags?: Array<string>
  twitterTitle?: string
  alt?: string
  width?: string | number
  height?: string | number
}

const props = defineProps<CldOgImageProps>()

const options = {
  ...props,
  crop: props.crop || 'fill',
  gravity: props.gravity || 'center',
  height: props.height || OG_IMAGE_HEIGHT,
  src: props.src,
  width: props.width || OG_IMAGE_WIDTH,
  widthResize: props.width || OG_IMAGE_WIDTH_RESIZE,
}

let imageWidth
  = typeof options.width === 'string'
    ? Number.parseInt(options.width)
    : options.width
let imageHeight
  = typeof options.height === 'string'
    ? Number.parseInt(options.height)
    : options.height

// Resize the height based on the widthResize property

if (typeof imageHeight === 'number' && typeof imageWidth === 'number') {
  imageHeight = (OG_IMAGE_WIDTH_RESIZE / imageWidth) * imageHeight
}

imageWidth = OG_IMAGE_WIDTH_RESIZE

// Render the final URLs. We use two different format versions to deliver
// webp for Twitter as it supports it (and we can control with tags) where
// other platforms may not support webp, so we deliver jpg

const { url: ogImageUrl } = useCldImageUrl({
  options: {
    ...options,
    format: props.format || 'jpg',
  },
} as ConstructUrlProps)

const { url: twitterImageUrl } = useCldImageUrl({
  options: {
    ...options,
    format: props.format || 'webp',
  },
} as ConstructUrlProps)

const computedTwitterTitle = computed(
  () =>
    props.twitterTitle
    || (currentRoute.value.meta?.title as string)
    || 'Learn More',
)
</script>

<template>
  <Head>
    <Meta
      key="og-image"
      property="og:image"
      :content="ogImageUrl"
    />
    <Meta
      key="og-image-secureurl"
      property="og:image:secure_url"
      :content="ogImageUrl"
    />
    <Meta
      key="og-image-width"
      property="og:image:width"
      :content="imageWidth.toString()"
    />
    <Meta
      key="og-image-height"
      property="og:image:height"
      :content="imageHeight.toString()"
    />
    <Meta
      v-if="alt"
      key="og-image-alt"
      property="og:image:alt"
      :content="alt"
    />
    <Meta
      v-if="!excludeTags?.includes('twitter:title')"
      key="twitter-title"
      property="twitter:title"
      :content="computedTwitterTitle"
    />
    <Meta
      key="twitter-card"
      property="twitter:card"
      :content="TWITTER_CARD"
    />
    <Meta
      key="twitter-image"
      property="twitter:image"
      :content="twitterImageUrl"
    />
  </Head>
</template>
