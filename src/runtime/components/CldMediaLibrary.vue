<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useRuntimeConfig } from "#imports";
import { PropType, ref } from "vue";

const cloudinaryRef = ref();

const props = defineProps({
  cloudName: {
    type: String,
    default: "",
  },
  apiKey: {
    type: String,
    required: true
  },
  username: {
    type: String,
    default: "",
  },
  useSaml: {
    type: Boolean,
    default: false,
  },
  buttonId: {
    type: String,
    required: true,
  },
  // Other params listed https://cloudinary.com/documentation/media_library_widget#2_set_the_configuration_options
  params: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
});

const emit = defineEmits(['onInsert'])

const handleOnLoad = () => {
  if ("cloudinary" in window) {
    cloudinaryRef.value = window.cloudinary;

    const options = Object.fromEntries(
      Object.entries(props).filter((elem) => Boolean(elem[1]))
    );

    cloudinaryRef.value.createMediaLibrary({
      inline_container: '#widget_container',
      cloud_name:
        props.cloudName || useRuntimeConfig().public.cloudinary.cloudName,
      api_key: props.apiKey || useRuntimeConfig().public.cloudinary.apiKey,
      ...options,
      ...props.params,
    },
    {
    insertHandler: function (data: unknown) {
      emit('onInsert', data)
    }
  },
  document.getElementById(props.buttonId)
  );
  }
};

useHead({
  script: [
    {
      id: `cloudinary-media-library-${Math.floor(Math.random() * 100)}`,
      src: `https://media-library.cloudinary.com/global/all.js`,
      onload: handleOnLoad,
      onerror: (e) =>
        console.error(
          `Failed to load Cloudinary Media Library: ${(e as any).message}`
        ),
    },
  ],
});
</script>

<template>
  <div>
    <div id="widget_container"></div>
  </div>
</template>
