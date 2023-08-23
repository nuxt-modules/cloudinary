<template>
  <CldUploadWidget v-slot="{ open }" uploadPreset="nuxt-cloudinary-unsigned">
    <button type="button" class="button" @click="open">Upload an Image</button>
  </CldUploadWidget>
</template>

<style scoped>
.button {
  background-color: #3448c5;
  padding: 12px;
  border-radius: 4px;
  transition: background-color 0.1s;
}
.button:hover {
  background-color: #5d6dd1;
}
</style>
