<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { ref, watch } from 'vue'
import {
  type ConfigOptions,
  generateSignatureCallback,
  generateUploadWidgetResultCallback,
  getUploadWidgetOptions,
  UPLOAD_WIDGET_EVENTS,
} from '@cloudinary-util/url-loader'
import type { CloudinaryUploadWidgetResults } from '@cloudinary-util/types'
import { useRuntimeConfig } from '#imports'

export interface CldUploadWidgetProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onOpen?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onUpload?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onAbort?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onBatchCancelled?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onDisplayChanged?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onPublicId?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onQueuesEnd?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onQueuesStart?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onRetry?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onShowCompleted?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSourceChanged?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSuccess?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onTags?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onUploadAdded?: Function
  options?: CldUploadWidgetPropsOptions
  signatureEndpoint?: URL | RequestInfo
  uploadPreset?: string
  config?: ConfigOptions
  tags?: Array<string>
}

// Parameters sourced from:
// https://cloudinary.com/documentation/upload_widget_reference#parameters

export interface CldUploadWidgetPropsOptions {
  // Widget

  encryption?: {
    key: string
    iv: string
  }
  defaultSource?: string
  maxFiles?: number
  multiple?: boolean
  sources?: Array<
    | 'camera'
    | 'dropbox'
    | 'facebook'
    | 'gettyimages'
    | 'google_drive'
    | 'image_search'
    | 'instagram'
    | 'istock'
    | 'local'
    | 'shutterstock'
    | 'unsplash'
    | 'url'
  >

  // Cropping

  cropping?: boolean
  croppingAspectRatio?: number
  croppingCoordinatesMode?: string
  croppingDefaultSelectionRatio?: number
  croppingShowBackButton?: boolean
  croppingShowDimensions?: boolean
  showSkipCropButton?: boolean

  // Sources

  dropboxAppKey?: string
  facebookAppId?: string
  googleApiKey?: string
  googleDriveClientId?: string
  instagramClientId?: string
  searchByRights?: boolean
  searchBySites?: Array<string>

  // Upload

  context?: object
  folder?: string
  publicId?: string
  resourceType?: string
  tags?: Array<string>
  // eslint-disable-next-line @typescript-eslint/ban-types
  uploadSignature?: string | Function
  uploadSignatureTimestamp?: number

  // Client Side

  clientAllowedFormats?: Array<string>
  croppingValidateDimensions?: boolean
  maxChunkSize?: number
  maxImageFileSize?: number
  maxImageHeight?: number
  maxImageWidth?: number
  maxFileSize?: number
  maxRawFileSize?: number
  maxVideoFileSize?: number
  minImageHeight?: number
  minImageWidth?: number
  validateMaxWidthHeight?: boolean

  // Containing Page

  fieldName?: string
  form?: string
  thumbnails?: string
  thumbnailTransformation?: string | Array<object>

  // Customization

  buttonCaption?: string
  buttonClass?: string
  text?: object
  theme?: string
  styles?: object

  // Advanced

  autoMinimize?: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  getTags?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  getUploadPresets?: Function
  inlineContainer?: any // string or DOM element
  language?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  preBatch?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  prepareUploadParams?: Function
  queueViewPosition?: string
  showAdvancedOptions?: boolean
  showCompletedButton?: boolean
  showInsecurePreview?: boolean
  showPoweredBy?: boolean
  showUploadMoreButton?: boolean
  singleUploadAutoClose?: boolean
}

export interface CldUploadWidgetResults {
  event: string
  info: string
}

function triggerOnIdle(callback: any) {
  if (window && 'requestIdleCallback' in window) {
    return requestIdleCallback(callback)
  }
  return setTimeout(() => callback(), 1)
}

const props = defineProps<CldUploadWidgetProps>()

const {
  onClose,
  onError,
  onOpen,
  onUpload,
  options,
  signatureEndpoint,
  uploadPreset,
  onAbort,
  onBatchCancelled,
  onDisplayChanged,
  onPublicId,
  onQueuesEnd,
  onQueuesStart,
  onRetry,
  onShowCompleted,
  onSourceChanged,
  onSuccess,
  onTags,
  onUploadAdded,
  config,
} = props

const cloudinary = ref()
const widget = ref()

const error = ref()
const results = ref<CloudinaryUploadWidgetResults>()
const isScriptLoading = ref(true)

// When creating a signed upload, you need to provide both your Cloudinary API Key
// as well as a signature generator function that will sign any paramters
// either on page load or during the upload process. Read more about signed uploads at:
// https://cloudinary.com/documentation/upload_widget#signed_uploads

const instanceMethods = {
  close,
  destroy,
  hide,
  isDestroyed,
  isMinimized,
  isShowing,
  minimize,
  open,
  show,
  update,
  'abort': onAbort,
  'batch-cancelled': onBatchCancelled,
  'display-changed': onDisplayChanged,
  'publicid': onPublicId,
  'queues-end': onQueuesEnd,
  'queues-start': onQueuesStart,
  'retry': onRetry,
  'show-completed': onShowCompleted,
  'source-changed': onSourceChanged,
  'success': onSuccess,
  'tags': onTags,
  'upload-added': onUploadAdded,
}

const uploadSignature
  = signatureEndpoint
  && generateSignatureCallback({
    signatureEndpoint: String(signatureEndpoint),
    fetch,
  })

const uploadOptions = getUploadWidgetOptions(
  {
    uploadPreset:
      uploadPreset || useRuntimeConfig().public.cloudinary.uploadPreset,
    apiKey: useRuntimeConfig().public.cloudinary.apiKey,
    uploadSignature,
    ...options,
  },
  {
    cloud: {
      cloudName: useRuntimeConfig().public.cloudinary.cloudName,
    },
    ...options,
    ...instanceMethods,
    ...config,
  },
)

const resultsCallback = generateUploadWidgetResultCallback({
  onError: (uploadError) => {
    error.value = uploadError

    if (typeof onError === 'function') {
      onError(uploadError, {
        widget: widget.value.current,
        ...instanceMethods,
      })
    }
  },
  onResult: (uploadResult) => {
    if (typeof uploadResult?.event !== 'string') return

    results.value = uploadResult

    const widgetEvent = UPLOAD_WIDGET_EVENTS[
      uploadResult.event
    ] as keyof typeof props

    if (
      typeof widgetEvent === 'string'
      && typeof props[widgetEvent] === 'function'
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-types
      const callback = props[widgetEvent] as Function
      callback(uploadResult, {
        widget: widget.value.current,
        ...instanceMethods,
      })
    }

    const widgetEventAction = `${widgetEvent}Action` as keyof typeof props

    if (widgetEventAction && typeof props[widgetEventAction] === 'function') {
      // eslint-disable-next-line @typescript-eslint/ban-types
      const action = props[widgetEventAction] as Function
      action(uploadResult)
    }
  },
})

if (props.tags?.length) {
  uploadOptions.showAdvancedOptions = true

  // eslint-disable-next-line @typescript-eslint/ban-types
  uploadOptions.getTags = (cb: Function, prefix: string) =>
    cb(prefix ? props.tags?.filter(t => !t.indexOf(prefix)) : props.tags)
}

// Handle result states and callbacks

watch(results, () => {
  if (typeof results.value === 'undefined') return

  const isSuccess = results.value?.event === 'success'
  const isClosed
    = results.value?.event === 'display-changed'
    && results.value.info === 'hidden'

  if (isSuccess && typeof onUpload === 'function') {
    onUpload(results, widget.value)
  }

  if (isClosed && typeof onClose === 'function') {
    onClose(widget.value)
  }
})

watch(error, () => {
  if (error.value && typeof onError === 'function') {
    onError(error, widget.value)
  }
})

/**
 * handleOnLoad
 * @description Stores the Cloudinary window instance to a ref when the widget script loads
 */

function handleOnLoad() {
  isScriptLoading.value = false
  if (!cloudinary.value) {
    cloudinary.value = (window as any).cloudinary
  }

  // To help improve load time of the widget on first instance, use requestIdleCallback
  // to trigger widget creation. Optional.

  triggerOnIdle(() => {
    if (!widget.value) {
      widget.value = createWidget()
    }
  })
}

/**
 * createWidget
 * @description Creates a new instance of the Cloudinary widget and stores in a ref
 */

function createWidget() {
  return cloudinary.value.createUploadWidget(uploadOptions, resultsCallback)
}

function invokeInstanceMethod(method: string) {
  if (!widget.value) {
    widget.value = createWidget()
  }

  if (typeof widget?.value[method] === 'function') {
    widget.value[method]()
  }
}

function close() {
  invokeInstanceMethod('close')
}

function destroy() {
  invokeInstanceMethod('destroy')
}

function hide() {
  invokeInstanceMethod('hide')
}

function isDestroyed() {
  invokeInstanceMethod('isDestroyed')
}

function isMinimized() {
  invokeInstanceMethod('isMinimized')
}

function isShowing() {
  invokeInstanceMethod('isShowing')
}

function minimize() {
  invokeInstanceMethod('minimize')
}

function show() {
  invokeInstanceMethod('show')
}

function update() {
  invokeInstanceMethod('update')
}
function open() {
  invokeInstanceMethod('open')

  if (typeof onOpen === 'function') {
    onOpen(widget.value)
  }
}

useHead({
  script: [
    {
      id: `cloudinary-uploadwidget-${Math.floor(Math.random() * 100)}`,
      src: 'https://widget.cloudinary.com/v2.0/global/all.js',
      onload: handleOnLoad,
      onerror: e =>
        console.error(
          `Failed to load Cloudinary Upload Widget: ${(e as any).message}`,
        ),
    },
  ],
})
</script>

<template>
  <slot
    :cloudinary="cloudinary"
    :widget="widget"
    :open="open"
    :update="update"
    :show="show"
    :is-showing="isShowing"
    :is-minimized="isMinimized"
    :is-destroyed="isDestroyed"
    :destroy="destroy"
    :close="close"
    :hide="hide"
    :minimize="minimize"
    :results="results"
    :error="error"
    :is-loading="isScriptLoading"
  />
</template>
