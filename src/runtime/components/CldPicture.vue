<script setup lang="ts">
import { ref,defineProps } from 'vue';
import CldSource from './CldSource.vue';


// Define props for CldPicture
const props = defineProps({
  sources:Array
});

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
  </picture>
</template>
