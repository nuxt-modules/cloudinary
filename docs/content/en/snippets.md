---
title: Snippets
description: 'Ready codes for trying out Cloudinary module'
position: 11
category: Community
version: 1
---

## Usage

### `image.element`

<badge>v1.0.0+</badge>

**Example 1** - Display the return HTML media tag using `v-html`

<alert type="warning">

Use `v-html` **only** for SSR (Server-side rendering) because it is not secured and can lead to XSS attacks

</alert>

```vue
<template>
  <div>
    <div v-html="element.toHtml()"/>
  </div>
</template>
<script>
export default {
  asyncData({ $cloudinary }) {
    const element = $cloudinary.image.element('example', {
      width: 500,
      crop: 'scale',
    })

    return { element }
  }
}
</script>

```

**Example 2** - Display the return HTML media tag using [dynamic component](https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components)

```vue
<template>
  <div>
    <component :is="image" />
  </div>
</template>
<script>
export default {
  computed: {
    image() {
      return {
        template: this.$cloudinary.image
          .element('example', {
            width: 500,
            crop: 'scale',
          })
          .toHtml(),
      }
    },
  },
}
</script>

```

### `video.thumbnail`

<badge>v1.0.0+</badge>

**Example 1** - Display poster for a video

```vue
<template>
  <div>
    <video width="320" height="240" controls :poster="thumbnail.url">
      <source :src="video" type="video/mp4" />
    </video>
  </div>
</template>
<script>
export default {
  data() {
    return {
      video_id: 'dog',
    }
  },
  computed: {
    video() {
      return this.$cloudinary.video
        .url(this.video_id, {
          fetch_format: 'mp4',
          controls: true,
        })
    },
    thumbnail() {
      return this.$cloudinary.video
        .thumbnail(this.video_id, {
          crop: 'scale',
          width: 320,
        })
    }
  }
}
</script>

```

<badge>v1.0.0+</badge>

## Feature

### Add image placeholder

```vue
<template>
  <div>
    <cld-image public-id="example" width="500">
      <cld-placeholder type="blur" />
    </cld-image>
  </div>
</template>
```

### Responsive and lazy-loading image delivery

```vue
<template>
  <div>
    <cld-image public-id="example" responsive loading="lazy" />
  </div>
</template>
```

### Fetch and optimize an image not hosted in Cloudinary

**Example 1** - Using `CldImage`

```vue
<template>
  <div>
    <cld-image
      public-id="https://images6.alphacoders.com/337/337780.jpg"
      type="fetch"
      reponsive
      loading="lazy"
    />
  </div>
</template>
```

**Example 2** - Using `image.fetchRemote`

<badge>v1.0.0+</badge>

```vue
<template>
  <div>
    <img :src="image" loading="lazy" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: this.$cloudinary.image.fetchRemote("https://images6.alphacoders.com/337/337780.jpg")
    }
  }
}
</script>
```

<alert type="info">

For `v0.0.11` and older, use `$cloudinary().fetchRemote()` instead.

</alert>
