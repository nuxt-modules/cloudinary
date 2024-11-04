<script setup lang="ts">
import type { CldUploadWidgetProps } from './CldUploadWidget.vue'

defineProps<CldUploadWidgetProps>()
</script>

<template>
  <CldUploadWidget
    v-slot="{ open, isLoading }"
    :upload-preset="uploadPreset"
    :on-error="onError"
    :on-result="onResult"
  >
    <button
      type="button"
      v-bind="$attrs"
      :disabled="isLoading"
      @click="(e: Event) => {
        e.preventDefault();
        open();
      }"
    >
      <slot />
    </button>
  </CldUploadWidget>
</template>
