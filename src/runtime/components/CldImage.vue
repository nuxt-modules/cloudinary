<script setup lang="ts">
// This is working in dev playground but does not work in the published package
// Come back to this after https://github.com/nuxt/nuxt/issues/20936 is fixed
// import type { AssetOptions } from '@cloudinary-util/url-loader'
import { useCldImageUrl } from '../composables/useCldImageUrl';
import { Image } from "@unpic/vue";

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

interface ImageOptionsZoomPan {
    loop: string | boolean;
    options: string;
}
interface ImageOptions extends AssetOptions {
    zoompan?: string | boolean | ImageOptionsZoomPan;
}

interface CldImageProps {
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  // Adding below as required props to promote good patterns in developing images
  alt: string;
  width: string | number;
  height: string | number;
  // Unpic props
  layout?: 'constrained' | 'fullWidth' | 'fixed';
  priority?: boolean;
  background?: 'auto' | string;
}

const props = defineProps<ImageOptions & CldImageProps>()

const { url } = useCldImageUrl({ options: props })

const transformUrl = ({ width }: { width: string | number }) => {
		const options = {
      ...props
		};

		options.width = typeof options.width === 'string' ? parseInt(options.width) : options.width;
		options.height = typeof options.height === 'string' ? parseInt(options.height) : options.height;

		if (typeof width === 'number' && typeof options.width === 'number' && width !== options.width) {
			options.widthResize = width;
		}

    const { url } = useCldImageUrl({ options });

		return url
}
</script>

<template>
  <Image
    :src="url"
    :layout="layout || 'constrained'"
    :width="width"
    :height="height"
    v-bind="$attrs"
    :loading="loading"
    :fetch-priority="fetchPriority"
    cdn="cloudinary"
    :transformer="transformUrl"
  />
</template>
