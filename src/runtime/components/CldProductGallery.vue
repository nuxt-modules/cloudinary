<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useRuntimeConfig } from "#imports";
import { PropType, ref } from "vue";

const cloudinaryRef = ref();

type MediaType = "image" | "video" | "spin";

const props = defineProps({
  cloudName: {
    type: String,
    default: "",
  },
  mediaAssets: {
    type: Array as PropType<{ tag: string; mediaType?: MediaType }[]>,
    required: true,
  },
  displayProps: {
    type: Object as PropType<{ mode: string; columns: number }>,
    default: () => ({}),
  },
  aspectRatio: {
    type: String,
    default: "",
  },
  imageBreakpoint: {
    type: Number,
    default: 0,
  },
  carouselStyle: {
    type: String,
    default: "",
  },
  indicatorProps: {
    type: Object as PropType<{ color: string }>,
    default: () => ({}),
  },
  carouselLocation: {
    type: String,
    default: "",
  },
  borderColor: {
    type: String,
    default: "",
  },
  borderWidth: {
    type: Number,
    default: 0,
  },
  transition: {
    type: String,
    default: "",
  },
  zoom: {
    type: Boolean,
    default: false,
  },
  // Other params listed https://cloudinary.com/documentation/product_gallery_reference#widget_parameters
  params: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
});

const handleOnLoad = () => {
  if ("cloudinary" in window) {
    cloudinaryRef.value = window.cloudinary;

    const options = Object.fromEntries(
      Object.entries(props).filter((elem) => {
        if (typeof elem[1] === "object") {
          return Object.keys(elem[1]).length ? elem : false;
        }

        return Boolean(elem[1]);
      })
    );

    const myGallery = cloudinaryRef.value.galleryWidget({
      container: "#product-gallery",
      cloudName:
        props.cloudName || useRuntimeConfig().public.cloudinary.cloudName,
      ...options,
      ...props.params,
    });

    myGallery.render();
  }
};

useHead({
  script: [
    {
      id: `cloudinary-product-gallery-${Math.floor(Math.random() * 100)}`,
      src: `https://product-gallery.cloudinary.com/all.js`,
      onload: handleOnLoad,
      onerror: (e) =>
        console.error(
          `Failed to load Cloudinary Product Gallery: ${(e as any).message}`
        ),
    },
  ],
});
</script>

<template>
  <div id="product-gallery" />
</template>
