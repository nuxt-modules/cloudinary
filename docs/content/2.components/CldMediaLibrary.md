---
description: 
---

The CldMediaLibrary creates a media gallery element that uses an instance of the [Cloudinary Media Library Widget](https://cloudinary.com/documentation/media_library_widget?utm_campaign=devx_nuxtcloudinary&utm_medium=referral&utm_source=nuxtcloudinary) to give you an easy way to add media library component to your Nuxt app.

## Basic Usage

```vue
<script setup lang="ts">
const buttonId = "open-btn";
const apiKey = useRuntimeConfig().public.cloudinary.apiKey;
</script>

<template>
  <div>
    <button :id="buttonId">Select Image or Video</button>
    <CldMediaLibrary :api-key="apiKey" :button-id="buttonId" />
  </div>
</template>
```

:media-library

## Props

CldMediaLibrary accepts several customization props listed below:

| Prop Name | Type    | Example    |
| --------- | ------- | ---------- |
| cloudName | string  | `"demo"`   |
| apiKey    | string  | `"12345"`  |
| buttonId  | string  | `"my-btn"` |
| username  | string  | `"user"`   |
| useSaml   | boolean | `false`    |
| params    | object  | `{}`       |

For all other available props check out [Cloudinary Media Gallery Docs](https://cloudinary.com/documentation/media_library_widget#2_set_the_configuration_options?utm_campaign=devx_nuxtcloudinary&utm_medium=referral&utm_source=nuxtcloudinary) and make sure to pass them to the component as `params` like following:

```vue
<script setup lang="ts">
const buttonId = "open-btn";
const apiKey = useRuntimeConfig().public.cloudinary.apiKey;

const params = {
  sortProps: {
    button_caption: "Open Media Library",
    insert_caption: "Insert",
    remove_header: false,
    max_files: 6,
  },
};
</script>

<template>
  <div>
    <button :id="buttonId">Select Image or Video</button>
    <ClsMediaLibrary :api-key="apiKey" :button-id="buttonId" :params="params" />
  </div>
</template>
```

## Events

ClsMediaLibrary emits following events:

| Event Name | Type     | Example         |
| ---------- | -------- | --------------- |
| onInsert   | function | `(data) => { }` |

You can use this event like following:

```vue
<script setup lang="ts">
const buttonId = "open-btn";
const apiKey = useRuntimeConfig().public.cloudinary.apiKey;

function handleInsert(data: unknown) {
  console.log(data)
}
</script>

<template>
  <div>
    <button :id="buttonId">Select Image or Video</button>
    <ClsMediaLibrary
      :api-key="apiKey"
      :button-id="buttonId"
      :params="params"
      @on-insert="handleInsert"
    />
  </div>
</template>
```
