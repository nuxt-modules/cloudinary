<script setup lang="ts">
import type { CldImageProps } from "./CldImage.vue";
import { useCldImageUrl } from "../composables/useCldImageUrl";
import type { ImageOptions } from "@cloudinary-util/url-loader";
import { computed } from 'vue'
import { useRouter } from "#imports";

const TWITTER_CARD = "summary_large_image";
const OG_IMAGE_WIDTH = 2400;
const OG_IMAGE_WIDTH_RESIZE = 1200;
const OG_IMAGE_HEIGHT = 1254;

const { currentRoute } = useRouter()

export type CldOgImageProps = CldImageProps & {
  excludeTags?: Array<string>;
  twitterTitle?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
};

const props = defineProps<CldOgImageProps>();

const options: ImageOptions = {
  ...props,
  crop: props.crop || "fill",
  gravity: props.gravity || "center",
  height: props.height || OG_IMAGE_HEIGHT,
  src: props.src,
  width: props.width || OG_IMAGE_WIDTH,
  widthResize: props.width || OG_IMAGE_WIDTH_RESIZE,
};

let width =
  typeof options.width === "string" ? parseInt(options.width) : options.width;
let height =
  typeof options.height === "string"
    ? parseInt(options.height)
    : options.height;

// Resize the height based on the widthResize property

if (typeof height === "number" && typeof width === "number") {
  height = (OG_IMAGE_WIDTH_RESIZE / width) * height;
}

width = OG_IMAGE_WIDTH_RESIZE;

// Render the final URLs. We use two different format versions to deliver
// webp for Twitter as it supports it (and we can control with tags) where
// other platforms may not support webp, so we deliver jpg

const { url: ogImageUrl } = useCldImageUrl({
  options: {
    ...options,
    format: props.format || "jpg",
  },
});

const { url: twitterImageUrl } = useCldImageUrl({
  options: {
    ...options,
    format: props.format || "webp",
  },
});

const computedTwitterTitle = computed(() => props.twitterTitle || currentRoute.meta?.title || ' ')
</script>

<template>
  <Head>
    <Meta
      key="og-image"
      property="og:image"
      :content="ogImageUrl"
    />
    <Meta
      key="og-image-secureurl"
      property="og:image:secure_url"
      :content="ogImageUrl"
    />
    <Meta
      key="og-image-width"
      property="og:image:width"
      :content="width.toString()"
    />
    <Meta
      key="og-image-height"
      property="og:image:height"
      :content="height.toString()"
    />
    <Meta
      v-if="alt"
      key="og-image-alt"
      property="og:image:alt"
      :content="alt"
    />
    <Meta
      v-if="!excludeTags?.includes('twitter:title')"
      key="twitter-title"
      property="twitter:title"
      :content="computedTwitterTitle"
    />
    <Meta
      key="twitter-card"
      property="twitter:card"
      :content="TWITTER_CARD"
    />
    <Meta
      key="twitter-image"
      property="twitter:image"
      :content="twitterImageUrl"
    />
  </Head>
</template>
