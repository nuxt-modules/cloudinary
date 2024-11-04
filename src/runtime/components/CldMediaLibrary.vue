<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'

const cloudinaryRef = ref()

type MediaLibraryProps = {
  cloudName?: string
  apiKey: string
  username?: string
  useSaml?: boolean
  buttonId: string
  params?: Record<string, any>
}

const props = defineProps<MediaLibraryProps>()

const emit = defineEmits(['onInsert'])

const handleOnLoad = () => {
  if ('cloudinary' in window) {
    cloudinaryRef.value = window.cloudinary

    const options = Object.fromEntries(
      Object.entries(props).filter(elem => Boolean(elem[1])),
    )

    cloudinaryRef.value.createMediaLibrary(
      {
        inline_container: '#widget_container',
        cloud_name:
          props.cloudName || useRuntimeConfig().public.cloudinary.cloudName,
        api_key: props.apiKey || useRuntimeConfig().public.cloudinary.apiKey,
        ...options,
        ...props.params,
      },
      {
        insertHandler: function (data: unknown) {
          emit('onInsert', data)
        },
      },
      document.getElementById(props.buttonId),
    )
  }
}

useHead({
  script: [
    {
      id: 'cloudinary-media-library',
      src: `https://media-library.cloudinary.com/global/all.js`,
      onload: handleOnLoad,
      onerror: e =>
        console.error(
          `Failed to load Cloudinary Media Library: ${(e as any).message}`,
        ),
    },
  ],
})
</script>

<template>
  <div id="widget_container" />
</template>
