<script lang="ts" setup>
// Usage of `useCldImageUrl` composable
const { url } = useCldImageUrl({ options: { src: '/cld-sample-5.jpg' } })
console.log(url)
</script>

<template>
  <!-- Usage of `CldOgImage.vue` component -->
  <CldOgImage
    src="cld-sample-2"
    twitter-title="test"
  />
  <!-- Usage of `CldImage.vue` component -->
  <CldImage
    src="cld-sample-5"
    width="987"
    height="987"
    alt="Sample Product"
    crop="fill"
    sizes="sm:100vw md:50vw lg:400px"
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
