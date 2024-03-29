<script setup lang="ts">
// This is working in dev playground but does not work in the published package
// Come back to this after https://github.com/nuxt/nuxt/issues/20936 is fixed
// import type { AssetOptions } from "@cloudinary-util/url-loader";
// import type { ConfigOptions } from "@cloudinary-util/url-loader";
import { useCldImageUrl } from "../composables/useCldImageUrl";
import { ref } from "vue";
import { Image } from "@unpic/vue";

interface AssetOptionsResize {
  crop?: string;
  width?: number | string;
}

interface ImageOptionsFillBackground {
  crop?: string;
  gravity?: string;
  prompt?: string;
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

type ImageOptionsRecolorPrompt = string | Array<string>;

interface ImageOptionsRecolor {
  prompt?: ImageOptionsRecolorPrompt;
  to?: string;
  multiple?: boolean;
}

interface ImageOptionsZoomPan {
  loop: string | boolean;
  options: string;
}

type ImageOptionsRemovePrompt = string | Array<string>;

interface ImageOptionsRemove {
  prompt?: ImageOptionsRemovePrompt;
  region?: [300, 200, 1900, 3500];
  multiple?: boolean;
  removeShadow?: boolean;
}

interface ImageOptionsGenerativeReplace {
  to: string;
  from: string;
  preserveGeometry?: boolean;
}
interface ImageOptions extends AssetOptions {
  zoompan?: string | boolean | ImageOptionsZoomPan;
  fillBackground?: boolean | ImageOptionsFillBackground;
  recolor?: ImageOptionsRecolorPrompt | ImageOptionsRecolor;
  remove?: ImageOptionsRemovePrompt | ImageOptionsRemove;
  replace?: Array<string | boolean> | ImageOptionsGenerativeReplace;
  restore?: boolean;
}

export interface CldImageProps extends ImageOptions {
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  // Adding below as required props to promote good patterns in developing images
  alt: string;
  width: string | number;
  height: string | number;
  // Cloudinary URL Loader props
  // Cannot use `ConfigOptions` due to the same issue as mentioned at the top
  config?: any;
  // Unpic props
  layout?: "constrained" | "fullWidth" | "fixed";
  priority?: boolean;
  background?: "auto" | string;
  // Cloudinary missing effect props
  blur?: string | number;
  pixelate?: boolean;
  grayscale?: boolean;
  tint?: string | number;
  opacity?: string | number;
  shear?: string;
  border?: string;
  loaderOptions?: {
    width: number | string;
  };
}

const props = defineProps<CldImageProps>();

// eslint-disable-next-line vue/no-setup-props-destructure
const { config, loaderOptions, ...options } = props;

const { url } = useCldImageUrl({ options, config });

const transformUrl = () => {
  const options = {
    ...props,
  };

  options.width =
    typeof options.width === "string" ? parseInt(options.width) : options.width;
  options.height =
    typeof options.height === "string"
      ? parseInt(options.height)
      : options.height;

  let widthResize;

  if (
    typeof loaderOptions?.width === "number" &&
    typeof options.width === "number" &&
    loaderOptions.width !== options.width
  ) {
    widthResize = loaderOptions.width;
  } else if (
    typeof loaderOptions?.width === "number" &&
    typeof options?.width !== "number"
  ) {
    widthResize = loaderOptions.width;
    options.width = widthResize;
  }

  // If we have a resize width that's smaller than the user-defined width, we want to give the
  // ability to perform a final resize on the image without impacting any of the effects like text
  // overlays that may depend on the size to work properly

  if (options.width && widthResize && widthResize < options.width) {
    options.widthResize = loaderOptions?.width;
  }

  const { url } = useCldImageUrl({ options, config });

  return url;
};

const imgKey = ref("image-key");

const handleError = async (payload: Event) => {
  const result = await pollForProcessingImage(payload);

  if (result) imgKey.value = `${imgKey.value}-${Math.random()}`;
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
    :priority="priority"
    cdn="cloudinary"
    :transformer="transformUrl"
    @error="handleError"
  />
</template>
