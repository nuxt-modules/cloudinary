<template>
  <div>
    <img :src="src">
    <cld-image public-id="sheep" width="500" crop="thumb" height="500" />
  </div>
</template>

<script>
export default {
  asyncData ({ $cloudinary }) {
    const src = $cloudinary.image.url('sheep')

    return { src }
  }
}
</script>
