<script setup lang="ts">
const { url } = useCldImageUrl({ options: { src: '/cld-sample-5.jpg' } })
</script>


<template>
  <section>
    <CldImage
      src="cld-sample-5.jpg"
      width="987"
      height="987"
      sizes="50vw"
      alt="Sample Product"
    />
    <p>{{ url }}</p>
  </section>
</template>
