<script setup lang="ts">
// This is working in dev playground but does not work in the published package
// Come back to this after https://github.com/nuxt/nuxt/issues/20936 is fixed
// import type { AssetOptions } from '@cloudinary-util/url-loader'
import { useCldImageUrl } from '../composables/useCldImageUrl';

interface AssetOptionsResize {
    crop?: string;
    width?: number | string;
}

interface AssetOptions {
    assetType?: string;
    crop?: string;
    deliveryType?: string;
    effects?: Array<any>;
    flags?: Array<string> | object;
    format?: string;
    gravity?: string;
    height?: string | number;
    overlays?: Array<any>;
    quality?: number | string;
    rawTransformations?: string[];
    removeBackground?: boolean;
    sanitize?: boolean;
    resize?: AssetOptionsResize;
    seoSuffix?: string;
    src: string;
    text?: any;
    transformations?: Array<string>;
    underlay?: string;
    underlays?: Array<any>;
    version?: number | string;
    width?: string | number;
    widthResize?: string | number;
    zoom?: string;
}

interface CldImageProps {
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  // Adding below as required props to promote good patterns in developing images
  alt: string;
  width: string | number;
  height: string | number;
}

const props = defineProps<AssetOptions & CldImageProps>()

const { url } = useCldImageUrl({ options: props })
</script>

<template>
  <nuxt-img
    :src="url"
    :width="width"
    :height="height"
    v-bind="$attrs"
    :loading="loading"
    :fetch-priority="fetchPriority"
  />
</template>
