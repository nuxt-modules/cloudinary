---
description: 
---

The CldProductGallery creates a product gallery element that uses an instance of the [Cloudinary Product Gallery Widget](https://cloudinary.com/documentation/product_gallery_reference) to give you an easy way to add product gallery component to your Nuxt app.

## Basic Usage

```vue
<script setup lang="ts">
const mediaAssets = [
  { tag: "electric_car_product_gallery_demo" }, // by default mediaType: "image"
  { tag: "electric_car_product_gallery_demo", mediaType: "video" },
  { tag: "electric_car_360_product_gallery_demo", mediaType: "spin" },
];
</script>

<template>
  <CldProductGallery :media-assets="mediaAssets" />
</template>
```

:product-gallery

## Props

CldProductGallery accepts several customization props listed below:

| Prop Name        | Type    | Example                                                              |
| ---------------- | ------- | -------------------------------------------------------------------- |
| cloudName        | string  | `"demo"`                                                             |
| mediaAssets      | array   | `[{ tag: 'electric_car_product_gallery_demo', mediaType: 'video' }]` |
| displayProps     | object  | `{ mode: "expanded", columns: 2 }`                                   |
| aspectRatio      | string  | `"4:3"`                                                              |
| imageBreakpoint  | number  | `200`                                                                |
| carouselStyle    | string  | `"indicators"`                                                       |
| indicatorProps   | object  | `{ color: "red" }`                                                   |
| carouselLocation | string  | `"right"`                                                            |
| borderColor      | string  | `"red"`                                                              |
| borderWidth      | number  | `5`                                                                  |
| transition       | string  | `"fade"`                                                             |
| zoom             | boolean | `false`                                                              |
| params           | object  | `{}`                                                                 |

For all other available props checkout [Cloudinary Product Gallery Docs](https://cloudinary.com/documentation/product_gallery_reference#widget_parameters) and make sure to pass them to the component as `params` like following:

```vue
<script setup lang="ts">
const mediaAssets = [
  { tag: "electric_car_product_gallery_demo" }, // by default mediaType: "image"
  { tag: "electric_car_product_gallery_demo", mediaType: "video" },
  { tag: "electric_car_360_product_gallery_demo", mediaType: "spin" },
];

const params = {
  sortProps: {
    source: "public_id",
    direction: "asc",
    videoBreakpoint: 200,
    carouselOffset: 6
  }
}
</script>

<template>
  <CldProductGallery
    :media-assets="mediaAssets"
    :params="params"
  />
</template>
```
