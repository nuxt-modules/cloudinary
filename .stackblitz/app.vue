<script lang="ts" setup>
// Usage of `useCldImageUrl` composable
const { url } = useCldImageUrl({ options: { src: '/cld-sample-5.jpg' } })
console.log(url)
</script>

<template>
  <!-- Usage of `CldImage.vue` component -->
  <CldImage
    src="cld-sample-5"
    width="987"
    height="987"
    alt="Sample Product"
  />
  <CldVideoPlayer
    width="1620"
    height="1080"
    src="videos/mountain-stars"
  />
  <!-- Usage of `CldUploadWidget.vue` component -->
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
  <!-- Usage of `CldUploadButton.vue` component -->
  <CldUploadButton
    upload-preset="nuxt-cloudinary-unsigned"
  >
    Upload
  </CldUploadButton>
  <p>CldOgImage is here. Inspect the html meta to see the result</p>
  <CldOgImage
    src="cld-sample-2"
    twitter-title="test"
  />
  <CldImage
    src="cld-sample-5"
    width="987"
    height="987"
    alt="Sample Product"
    :overlays="[
      {
        position: {
          gravity: 'north',
          y: 60
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
        }
      },
      {
        position: {
          gravity: 'south',
          y: 60
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
        }
      }
    ]"
  />
</template>
