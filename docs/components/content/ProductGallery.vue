<script setup lang="ts">
const mediaAssets = [
  { tag: "electric_car_product_gallery_demo" }, // by default mediaType: "image"
  { tag: "electric_car_product_gallery_demo", mediaType: "video" },
  { tag: "electric_car_360_product_gallery_demo", mediaType: "spin" },
];
</script>

<template>
  <CldProductGallery :media-assets="mediaAssets" cloud-name="demo" />
</template>
