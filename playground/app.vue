<script lang="ts" setup>
import type {
  CloudinaryUploadWidgetError,
  CloudinaryUploadWidgetResults,
} from '@cloudinary-util/types'
import type { MediaType } from '../src/runtime/components/CldProductGallery.vue'

const { url } = useCldImageUrl({ options: { src: '/cld-sample-5.jpg' } })
console.log(url)

const { url: videoUrl } = useCldVideoUrl({
  options: { src: 'videos/mountain-stars' },
})
console.log(videoUrl)

const mediaAssets: { tag: string, mediaType?: MediaType }[] = [
  { tag: 'electric_car_product_gallery_demo' }, // by default mediaType: "image"
  { tag: 'electric_car_product_gallery_demo', mediaType: 'video' },
  { tag: 'electric_car_360_product_gallery_demo', mediaType: 'spin' },
]

const buttonId = 'open-btn'

const cldVideoRef = ref()

const chapters = {
  0: 'Chapter 1',
  6: 'Chapter 2',
  9: 'Chapter 3',
}

const colors = {
  accent: '#ff0000',
  base: '#00ff00',
  text: '#0000ff',
}

const onResult = (results: CloudinaryUploadWidgetResults) => {
  console.log('results', results)
}
const onError = (
  error: CloudinaryUploadWidgetError,
  results: CloudinaryUploadWidgetResults,
) => {
  console.log('error', error)
  console.log('results', results)
}
</script>

<template>
  <button :id="buttonId">
    Select Image or Video
  </button>
  <CldMediaLibrary
    api-key="12345"
    :button-id="buttonId"
    style="height: 600px"
  />
  <CldProductGallery
    :media-assets="mediaAssets"
    cloud-name="demo"
    :button-id="buttonId"
  />
  <CldOgImage
    src="cld-sample-2"
    twitter-title="test"
    width="987"
    height="987"
    alt="twitter-title"
  />
  <CldVideoPlayer
    ref="cldVideoRef"
    auto-play
    autoplay-mode="on-scroll"
    loop
    muted
    playsinline
    width="1620"
    height="1080"
    src="videos/dog-running-snow"
    :config="{ url: { cname: 'test' } }"
    picture-in-picture-toggle
    chapters-button
    :chapters="chapters"
    :colors="colors"
    :transformation="{ raw_transformation: 'e_fade:2000,e_fade:-2000' }"
  />
  <CldUploadWidget
    v-slot="{ open }"
    upload-preset="nuxt-cloudinary-unsigned"
    :tags="['sad', 'music']"
    :on-error="onError"
    :on-result="onResult"
  >
    <button
      type="button"
      @click="open"
    >
      Upload an Image
    </button>
  </CldUploadWidget>
  <CldUploadButton
    upload-preset="nuxt-cloudinary-unsigned"
    :on-error="onError"
    :on-result="onResult"
  >
    Upload
  </CldUploadButton>
  <CldImage
    src="cld-sample-5"
    width="987"
    height="987"
    alt="Sample Product"
    crop="fill"
    priority
    sizes="(max-width: 600px) 480px,
         800px"
    :replace-background="{ prompt: 'fish tank', seed: 3 }"
    :extract="{
      prompt: 'space jellyfish',
      multiple: true,
      mode: 'mask',
      invert: true,
    }"
  />
  <CldImage
    src="cld-sample-5"
    width="987"
    height="987"
    alt="Sample Product"
    :crop="{
      type: 'thumb',
      width: 600,
      height: 600,
      source: true,
    }"
    :overlays="[
      {
        position: {
          gravity: 'north',
          y: 60,
        },
        text: {
          color: 'rgb:52a4ff80',
          fontFamily: 'Source Sans Pro',
          fontSize: 320,
          fontWeight: 'black',
          text: 'MUSIC',
          letterSpacing: -10,
          lineSpacing: -100,
          stroke: true,
          border: '20px_solid_rgb:2d0eff99',
        },
      },
      {
        position: {
          gravity: 'south',
          y: 60,
        },
        text: {
          color: 'rgb:52a4ff80',
          fontFamily: 'Source Sans Pro',
          fontSize: 320,
          fontWeight: 'black',
          text: 'IS LIFE',
          letterSpacing: -10,
          lineSpacing: -100,
          stroke: true,
          border: '20px_solid_rgb:2d0eff99',
        },
      },
    ]"
  />
</template>
