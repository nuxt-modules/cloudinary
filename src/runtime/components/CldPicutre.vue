<script setup lang="ts">
import { ref } from 'vue';
import { CldImageProps } from './CldImage'; // Import CldImageProps if needed

// Define props for CldPicture
const props = defineProps<CldImageProps>();

const { url, transformUrl } = useCldPictureUrl(props);

// CldSource objects for <source> elements
const sources = ref([
  {
    srcset: 'path-to-image-1',
    media: '(min-width: 800px)',
  },
  {
    srcset: 'path-to-image-2',
    media: '(min-width: 1200px)',
  },
]);

const handleError = async (payload: Event) => {
  // Handle error logic here if needed
};
</script>

<template>
    <picture>
      <CldSource
        v-for="(source, index) in sources"
        :key="index"
        :srcset="source.srcset"
        :media="source.media"
      />
      <CldImg
        :src="url"
        :alt="alt"
        :width="width"
        :height="height"
        :loading="loading"
        :fetch-priority="fetchPriority"
        :layout="layout || 'constrained'"
        :transformer="transformUrl"
        @error="handleError"
        v-bind="$attrs"
      />
    </picture>
  </template>