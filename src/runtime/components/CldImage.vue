<script setup lang="ts">
import type { AssetOptions } from '@cloudinary-util/url-loader'
import { useCldImageUrl } from '../composables/useCldImageUrl';

interface CldImageProps {
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}

const props = defineProps<AssetOptions & CldImageProps>()

const { url } = useCldImageUrl({ options: props })
</script>

<template>
  <nuxt-img
    :src="url"
    :width="width"
    :height="height"
    v-bind="$attrs"
    :loading="loading"
    :fetch-priority="fetchPriority"
  />
</template>
