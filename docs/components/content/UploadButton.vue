<script setup lang="ts">
import { ref } from "vue";
const resource = ref();
</script>

<template>
  <div>
    <CldUploadButton
      upload-preset="nuxt-cloudinary-unsigned"
      :on-upload="
        (result, widget) => {
          resource.value = result?.info;
          widget.close();
        }
      "
    >
      Upload
    </CldUploadButton>
    <p>URL: {{ resource?.secure_url }}</p>
  </div>
</template>
