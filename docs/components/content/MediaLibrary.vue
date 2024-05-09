<script setup lang="ts">
const buttonId = 'open-btn'
const apiKey = '12345'
</script>

<template>
  <div>
    <button :id="buttonId">
      Select Image or Video
    </button>
    <CldMediaLibrary
      :api-key="apiKey"
      :button-id="buttonId"
    />
  </div>
</template>
