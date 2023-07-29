<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { ref, watch } from "vue";
import { useRuntimeConfig } from "#imports";

export interface CldUploadWidgetProps {
  children?: ({
    cloudinary,
    widget,
    open,
    results,
    error,
  }: CldUploadWidgetPropsChildren) => JSX.Element;
  onClose?: Function;
  onError?: Function;
  onOpen?: Function;
  onUpload?: Function;
  options?: CldUploadWidgetPropsOptions;
  signatureEndpoint?: URL | RequestInfo;
  uploadPreset?: string;
}

export interface CldUploadWidgetPropsChildren {
  cloudinary: any;
  widget: any;
  open: Function;
  results?: object;
  error?: any;
  isLoading?: boolean;
}

// Parameters sourced from:
// https://cloudinary.com/documentation/upload_widget_reference#parameters

export interface CldUploadWidgetPropsOptions {
  // Widget

  encryption?: {
    key: string;
    iv: string;
  };
  defaultSource?: string;
  maxFiles?: number;
  multiple?: boolean;
  sources?: Array<
    | "camera"
    | "dropbox"
    | "facebook"
    | "gettyimages"
    | "google_drive"
    | "image_search"
    | "instagram"
    | "istock"
    | "local"
    | "shutterstock"
    | "unsplash"
    | "url"
  >;

  // Cropping

  cropping?: boolean;
  croppingAspectRatio?: number;
  croppingCoordinatesMode?: string;
  croppingDefaultSelectionRatio?: number;
  croppingShowBackButton?: boolean;
  croppingShowDimensions?: boolean;
  showSkipCropButton?: boolean;

  // Sources

  dropboxAppKey?: string;
  facebookAppId?: string;
  googleApiKey?: string;
  googleDriveClientId?: string;
  instagramClientId?: string;
  searchByRights?: boolean;
  searchBySites?: Array<string>;

  // Upload

  context?: object;
  folder?: string;
  publicId?: string;
  resourceType?: string;
  tags?: Array<string>;
  uploadSignature?: string | Function;
  uploadSignatureTimestamp?: number;

  // Client Side

  clientAllowedFormats?: Array<string>;
  croppingValidateDimensions?: boolean;
  maxChunkSize?: number;
  maxImageFileSize?: number;
  maxImageHeight?: number;
  maxImageWidth?: number;
  maxFileSize?: number;
  maxRawFileSize?: number;
  maxVideoFileSize?: number;
  minImageHeight?: number;
  minImageWidth?: number;
  validateMaxWidthHeight?: boolean;

  // Containing Page

  fieldName?: string;
  form?: string;
  thumbnails?: string;
  thumbnailTransformation?: string | Array<object>;

  // Customization

  buttonCaption?: string;
  buttonClass?: string;
  text?: object;
  theme?: string;
  styles?: object;

  // Advanced

  autoMinimize?: boolean;
  getTags?: Function;
  getUploadPresets?: Function;
  inlineContainer?: any; // string or DOM element
  language?: string;
  preBatch?: Function;
  prepareUploadParams?: Function;
  queueViewPosition?: string;
  showAdvancedOptions?: boolean;
  showCompletedButton?: boolean;
  showInsecurePreview?: boolean;
  showPoweredBy?: boolean;
  showUploadMoreButton?: boolean;
  singleUploadAutoClose?: boolean;
}

export interface CldUploadWidgetResults {
  event: string;
  info: string;
}

function triggerOnIdle(callback: any) {
  if (window && "requestIdleCallback" in window) {
    return requestIdleCallback(callback);
  }
  return setTimeout(() => callback(), 1);
}

const WIDGET_WATCHED_EVENTS = ["success", "display-changed"];

const props = defineProps<CldUploadWidgetProps>();

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  onClose,
  onError,
  onOpen,
  onUpload,
  options,
  signatureEndpoint,
  uploadPreset,
} = props;

const cloudinary = ref();
const widget = ref();

const signed = !!signatureEndpoint;

const error = ref(undefined);
const results = ref<CldUploadWidgetResults | undefined>(undefined);
const isScriptLoading = ref(true);

// When creating a signed upload, you need to provide both your Cloudinary API Key
// as well as a signature generator function that will sign any paramters
// either on page load or during the upload process. Read more about signed uploads at:
// https://cloudinary.com/documentation/upload_widget#signed_uploads

const uploadOptions = {
  cloudName: useRuntimeConfig().public.cloudinary.cloudName,
  uploadPreset:
    uploadPreset || useRuntimeConfig().public.cloudinary.uploadPreset,
  apiKey: useRuntimeConfig().public.cloudinary.apiKey,
  ...options,
};

if (signed) {
  uploadOptions.uploadSignature = generateSignature;

  if (!uploadOptions.apiKey) {
    console.warn(`Missing dependency: Signed Upload requires an API key`);
  }
}

// Handle result states and callbacks

watch(results, () => {
  if (typeof results.value === "undefined") return;

  const isSuccess = results.value?.event === "success";
  const isClosed =
    results.value?.event === "display-changed" &&
    results.value.info === "hidden";

  if (isSuccess && typeof onUpload === "function") {
    onUpload(results, widget.value);
  }

  if (isClosed && typeof onClose === "function") {
    onClose(widget.value);
  }
});

watch(error, () => {
  if (error.value && typeof onError === "function") {
    onError(error, widget.value);
  }
});

/**
 * handleOnLoad
 * @description Stores the Cloudinary window instance to a ref when the widget script loads
 */

function handleOnLoad() {
  isScriptLoading.value = false;
  if (!cloudinary.value) {
    cloudinary.value = (window as any).cloudinary;
  }

  // To help improve load time of the widget on first instance, use requestIdleCallback
  // to trigger widget creation. Optional.

  triggerOnIdle(() => {
    if (!widget.value) {
      widget.value = createWidget();
    }
  });
}

/**
 * generateSignature
 * @description Makes a request to an endpoint to sign Cloudinary parameters as part of widget creation
 */

function generateSignature(callback: Function, paramsToSign: object) {
  if (typeof signatureEndpoint === "undefined") {
    throw Error("Failed to generate signature: signatureEndpoint undefined.");
  }
  fetch(signatureEndpoint, {
    method: "POST",
    body: JSON.stringify({
      paramsToSign,
    }),
  })
    .then((r) => r.json())
    .then(({ signature }) => {
      callback(signature);
    });
}

/**
 * createWidget
 * @description Creates a new instance of the Cloudinary widget and stores in a ref
 */

function createWidget() {
  return cloudinary.value?.createUploadWidget(
    uploadOptions,
    (uploadError: any, uploadResult: any) => {
      // The callback is a bit more chatty than failed or success so
      // only trigger when one of those are the case. You can additionally
      // create a separate handler such as onEvent and trigger it on
      // ever occurrence

      if (typeof uploadError !== "undefined") {
        error.value = uploadError;
      }

      if (WIDGET_WATCHED_EVENTS.includes(uploadResult?.event)) {
        results.value = uploadResult;
      }
    }
  );
}

/**
 * open
 * @description When triggered, uses the current widget instance to open the upload modal
 */

function open() {
  if (!widget.value) {
    widget.value = createWidget();
  }

  widget?.value.open();

  if (typeof onOpen === "function") {
    onOpen(widget.value);
  }
}

useHead({
  script: [
    {
      id: `cloudinary-uploadwidget-${Math.floor(Math.random() * 100)}`,
      src: "https://widget.cloudinary.com/v2.0/global/all.js",
      onload: handleOnLoad,
      onerror: (e) =>
        console.error(
          `Failed to load Cloudinary Upload Widget: ${(e as any).message}`
        ),
    },
  ],
});
</script>

<template>
  <slot
    :cloudinary="cloudinary"
    :widget="widget"
    :open="open"
    :results="results"
    :error="error"
    :is-loading="isScriptLoading"
  />
</template>
