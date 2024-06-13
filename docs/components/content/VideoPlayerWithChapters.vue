<script setup lang="ts">
const chapters = {
  0: 'Chapter 1',
  6: 'Chapter 2',
  9: 'Chapter 3',
}
</script>

<template>
  <CldVideoPlayer
    id="5"
    width="1620"
    height="1080"
    src="videos/dog-running-snow"
    :config="{ url: { cname: 'test' } }"
    chapters-button
    :chapters="chapters"
  />
</template>
