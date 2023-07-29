<template>
  <CldUploadWidget v-slot="{ open }" uploadPreset="nuxt-cloudinary-unsigned">
    <button type="button" @click="open">Upload an Image</button>
  </CldUploadWidget>
</template>
