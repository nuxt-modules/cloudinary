<script setup lang="ts">
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
  uploadSignature?: string | ((...args: any[]) => any)
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
  getTags?: (...args: any[]) => any
  getUploadPresets?: (...args: any[]) => any
  inlineContainer?: any // string or DOM element
  language?: string
  preBatch?: (...args: any[]) => any
  prepareUploadParams?: (...args: any[]) => any
  queueViewPosition?: string
  showAdvancedOptions?: boolean
  showCompletedButton?: boolean
  showInsecurePreview?: boolean
  showPoweredBy?: boolean
  showUploadMoreButton?: boolean
  singleUploadAutoClose?: boolean
}

export interface CldUploadWidgetProps {
  onClose?: (...args: any[]) => any
  onError?: (...args: any[]) => any
  onOpen?: (...args: any[]) => any
  onUpload?: (...args: any[]) => any
  onClick?: (...args: any[]) => any
  onAbort?: (...args: any[]) => any
  onBatchCancelled?: (...args: any[]) => any
  onDisplayChanged?: (...args: any[]) => any
  onPublicId?: (...args: any[]) => any
  onQueuesEnd?: (...args: any[]) => any
  onQueuesStart?: (...args: any[]) => any
  onRetry?: (...args: any[]) => any
  onShowCompleted?: (...args: any[]) => any
  onSourceChanged?: (...args: any[]) => any
  onSuccess?: (...args: any[]) => any
  onTags?: (...args: any[]) => any
  onUploadAdded?: (...args: any[]) => any
  options?: CldUploadWidgetPropsOptions
  signatureEndpoint?: URL | RequestInfo
  uploadPreset?: string
}

defineProps<CldUploadWidgetProps>()
</script>

<template>
  <CldUploadWidget
    v-slot="{ open, isLoading }"
    :upload-preset="uploadPreset"
  >
    <button
      type="button"
      v-bind="$attrs"
      :disabled="isLoading"
      @click="(e: Event) => {
        e.preventDefault();
        open();
        if (typeof onClick === 'function') onClick(e)
      }"
    >
      <slot />
    </button>
  </CldUploadWidget>
</template>
