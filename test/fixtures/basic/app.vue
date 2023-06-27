<script setup lang="ts">
const { url } = useCldImageUrl({ options: { src: '/cld-sample-5.jpg' } })
</script>

<template>
  <CldImage
    src="cld-sample-5"
    width="987"
    height="987"
    alt="Sample Product"
    crop="fill"
  />
  <p>{{ url }}</p>
</template>
