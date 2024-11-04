<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { ref, watch } from 'vue'
import {
  type ConfigOptions,
  type GetUploadWidgetOptions,
  type GenerateUploadWidgetResultCallback,
  generateSignatureCallback,
  generateUploadWidgetResultCallback,
  getUploadWidgetOptions,
  UPLOAD_WIDGET_EVENTS,
} from '@cloudinary-util/url-loader'
import type { CloudinaryUploadWidgetResults } from '@cloudinary-util/types'
import { triggerOnIdle } from '../util/triggerOnIdle'
import { useRuntimeConfig } from '#imports'

export interface CldUploadWidgetProps
  extends GenerateUploadWidgetResultCallback {
  options?: GetUploadWidgetOptions
  signatureEndpoint?: URL | RequestInfo
  uploadPreset?: string
  config?: ConfigOptions
  tags?: Array<string>
}

type UploadActionFunction = (
  results: CloudinaryUploadWidgetResults,
  data?: any
) => object
type CallbackFunction = (data?: string[]) => object

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
      apiKey: useRuntimeConfig().public.cloudinary.apiKey,
    },
    ...options,
    ...instanceMethods,
    ...config,
  },
)

const resultsCallback = generateUploadWidgetResultCallback({
  onError: (uploadError) => {
    error.value = uploadError

    if (typeof onError === 'function' && results.value) {
      onError(uploadError, results.value)
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
      const callback = props[widgetEvent] as UploadActionFunction
      callback(uploadResult, {
        widget: widget.value.current,
        ...instanceMethods,
      })
    }

    const widgetEventAction = `${widgetEvent}Action` as keyof typeof props

    if (widgetEventAction && typeof props[widgetEventAction] === 'function') {
      const action = props[widgetEventAction] as UploadActionFunction
      action(uploadResult)
    }
  },
})

if (props.tags?.length) {
  uploadOptions.showAdvancedOptions = true

  uploadOptions.getTags = (cb: CallbackFunction, prefix: string) =>
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
    onUpload(results.value)
  }

  if (isClosed && typeof onClose === 'function') {
    onClose(widget.value)
  }
})

watch(error, () => {
  if (error.value && typeof onError === 'function') {
    onError(error.value, widget.value)
  }
})

/**
 * handleOnLoad
 * @description Stores the Cloudinary window instance to a ref when the widget script loads
 */

function handleOnLoad() {
  isScriptLoading.value = false
  if (!cloudinary.value) {
    if ('cloudinary' in window) {
      cloudinary.value = window.cloudinary
    }
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
