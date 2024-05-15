<script lang="ts" setup>
// Usage of `useCldImageUrl` composable
const { url } = useCldImageUrl({ options: { src: '/cld-sample-5.jpg' } })
console.log(url)

const { url: videoUrl } = useCldVideoUrl({
  options: { src: 'videos/mountain-stars' },
})
console.log(videoUrl)

const mediaAssets = [
  { tag: 'electric_car_product_gallery_demo' }, // by default mediaType: "image"
  { tag: 'electric_car_product_gallery_demo', mediaType: 'video' },
  { tag: 'electric_car_360_product_gallery_demo', mediaType: 'spin' },
]

const buttonId = 'open-btn'

const cldVideoRef = ref()
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
  />
  <CldVideoPlayer
    ref="cldVideoRef"
    width="1620"
    height="1080"
    src="videos/dog-running-snow"
    chapters
    :config="{ url: { cname: 'test' } }"
    picture-in-picture-toggle
  />
  <CldUploadWidget
    v-slot="{ open }"
    upload-preset="nuxt-cloudinary-unsigned"
  >
    <button
      type="button"
      @click="open"
    >
      Upload an Image
    </button>
  </CldUploadWidget>
  <CldUploadButton upload-preset="nuxt-cloudinary-unsigned">
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
  />
  <CldImage
    src="cld-sample-5"
    width="987"
    height="987"
    alt="Sample Product"
    crop="fill"
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
