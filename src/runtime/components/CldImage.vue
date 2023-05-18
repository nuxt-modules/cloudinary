<script setup lang="ts">
import type { AssetOptions } from '@cloudinary-util/url-loader'

interface CldImageProps {
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}

const props = defineProps<AssetOptions & CldImageProps>()

const { url } = useCldImageUrl({ options: props })
</script>

<template>
  <img
    :src="url"
    :width="width"
    :height="height"
    v-bind="$attrs"
    :loading="loading"
    :fetchPriority="fetchPriority"
  />
</template>
