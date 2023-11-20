<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useRuntimeConfig } from "#imports";
import { ref } from "vue";

const cloudinaryRef = ref();

type MediaType = "image" | "video" | "spin";

type ProductGalleryProps = {
  cloudName?: string;
  mediaAssets: {
    tage: string;
    mediaType?: MediaType;
  }[];
  displayProps?: {
    mode: string;
    columns: number
  }[];
  aspectRatio?: string;
  imageBreakpoint?: number;
  carouselStyle?: string;
  indicatorProps?: {
    color?: string;
  };
  carouselLocation?: string;
  borderColor?: string;
  borderWidth?: number;
  transition?: string;
  zoom?: boolean;
  // Other params listed https://cloudinary.com/documentation/product_gallery_reference#widget_parameters
  params?: Record<string, any>
}

const props = defineProps<ProductGalleryProps>();

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
