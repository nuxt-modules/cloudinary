<script setup lang="ts">
// This is working in dev playground but does not work in the published package
// Come back to this after https://github.com/nuxt/nuxt/issues/20936 is fixed
// import type { AssetOptions } from '@cloudinary-util/url-loader'
import { useCldImageUrl } from "../composables/useCldImageUrl";
import { Image } from "@unpic/vue";
import { ConfigOptions } from "@cloudinary-util/url-loader";

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

export interface CldImageProps extends ImageOptions {
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  // Adding below as required props to promote good patterns in developing images
  alt: string;
  width: string | number;
  height: string | number;
  // Cloudinary URL Loader props
  config?: ConfigOptions;
  // Unpic props
  layout?: "constrained" | "fullWidth" | "fixed";
  priority?: boolean;
  background?: "auto" | string;
}

const props = defineProps<CldImageProps>();

// eslint-disable-next-line vue/no-setup-props-destructure
const { config, ...options } = props;

const { url } = useCldImageUrl({ options, config });

const transformUrl = ({ width }: { width: string | number }) => {
  const options = {
    ...props,
  };

  options.width =
    typeof options.width === "string" ? parseInt(options.width) : options.width;
  options.height =
    typeof options.height === "string"
      ? parseInt(options.height)
      : options.height;

  if (
    typeof width === "number" &&
    typeof options.width === "number" &&
    width !== options.width
  ) {
    options.widthResize = width;
  }

  const { url } = useCldImageUrl({ options, config });

  return url;
};

const imgKey = ref('image-key')

const handleError = async (payload: Event) => {
  const result = await pollForProcessingImage(payload);

  if (result) imgKey.value = `${imgKey.value}-${Math.random()}`
};

const pollForProcessingImage = async (options: Event): Promise<boolean> => {
  const { src } = options.target as EventTarget & { src: string };
  try {
    await new Promise((resolve, reject) => {
      fetch(src).then((res) => {
        if (!res.ok) {
          reject(res);
          return;
        }
        resolve(res);
      });
    });
  } catch (e: any) {
    if (e.status === 423) {
      return await pollForProcessingImage(options);
    }
    return false;
  }
  return true;
};
</script>

<template>
  <Image
    :key="imgKey"
    :src="url"
    :layout="layout || 'constrained'"
    :width="width"
    :height="height"
    v-bind="$attrs"
    :loading="loading"
    :fetch-priority="fetchPriority"
    cdn="cloudinary"
    :transformer="transformUrl"
    @error="handleError"
  />
</template>
