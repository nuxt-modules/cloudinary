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
  onClick?: Function
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
