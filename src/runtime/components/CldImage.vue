<script setup lang="ts">
import { ImgHTMLAttributes } from 'vue';

// The following does not work now as Nuxt 3.4.3 uses Vue 3.2.X while typing defineProps was added in 3.3
// When Nuxt will migrate to Vue 3.3.X we will be able to replace the local props with just the import of the types from cloudinary url loader.
// import type { AssetOptions } from '@cloudinary-util/url-loader'

interface AssetOptionsResize {
  crop?: string;
  width?: number | string;
}
interface AssetOptions extends ImgHTMLAttributes{
  assetType?: string;
  crop?: string;
  deliveryType?: string;
  effects?: Array<any>;
  format?: string;
  gravity?: string;
  height?: string | number;
  overlays?: Array<any>;
  quality?: number;
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

interface CldImageProps extends AssetOptions {
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}

const props = defineProps<CldImageProps>()

const { url } = useCldImageUrl({ options: props })
</script>

<template>
  <!-- TODO: bind attrs -->
  <img
    :src="url"
    :width="width"
    :height="height"
    :alt="text"
    :sizes="sizes"
    :loading="loading"
    :fetchPriority="fetchPriority"
    :srcset="srcset"
    :crossorigin="crossorigin"
  />
</template>
