<template>
  <CldVideoPlayer
    width="1620"
    height="1080"
    src="videos/mountain-stars"
    :colors="colors"
    font-face="Source Serif Pro"
  />
</template>

<script setup lang="ts">
const colors = {
  accent: '#ff0000',
  base: '#00ff00',
  text: '#0000ff',
}
</script>
