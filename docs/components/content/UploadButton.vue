<script setup lang="ts">
import { ref } from "vue";
const resource = ref();
</script>

<template>
  <div>
    <CldUploadButton
      class="button"
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

<style>
.button > button {
  background-color: #3448c5;
  padding: 12px;
  border-radius: 4px;
  transition: background-color 0.1s;
}
.button > button:hover {
  background-color: #5d6dd1;
}
</style>
