<template>
  <CldImage
    src="cld-sample-5"
    width="987"
    height="987"
    alt="Sample Product"
    :extract="{
      prompt: 'space jellyfish',
      multiple: true,
      mode: 'mask',
      invert: true,
    }"
  />
</template>
