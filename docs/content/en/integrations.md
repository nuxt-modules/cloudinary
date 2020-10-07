---
title: Integrations
description: 'How to use Cloudinary module with other modules'
position: 12
category: Community
version: 1
badge: v1.0.0+
---

## @nuxt/content

<badge>v1.0.0+</badge>

While using [@nuxt/content](https://content.nuxtjs.org/) module for content fetching and displaying, you may want to automatically optimize the main cover image for a single post out of the box. You can do this by using Cloudinary upload feature and modify the fetched document with `content:file:beforeInsert` hook.

<alert type="info">

To use `$cloudinary` inside any content hook, you need to add `@nuxtjs/cloudinary` before `@nuxt/content` in the `modules` property.

</alert>

Assume structure of your `content` folder is as below:

```
-| content/
----| posts/
-------| hello-world.md
-------| hello-world-cover.png
----| index.md
```

And in `content/posts/hello-world.md`, we define the following YAML front matter block:

```yaml
title: Hello World
image: hello-world-cover.png
description: A hellow world post
```

In which `image` points to the image file `hello-world-cover.png` located in the same directory.

To start optimizing the cover image defined in `image` field, we need to perform the following inside the handler for `content:file:beforeInsert` hook:

* Check if the target image has been uploaded to your Cloudinary account according to its unique public id. We choose the public id according to the syntax - `{post-file-name}-cover`.

  If the image has been uploaded previously, retrieve the image's information with `$cloudinary.explicit`.

* Else, upload the original image file to Cloudinary with the target public id defined in step 1, using `$cloudinary.upload`.
* Replace `image` with the returned information.

```js
import path from 'path'

export default {
  modules: [
    '@nuxtjs/cloudinary',
    '@nuxt/content',
  ],
  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET_KEY,
  },
  hooks: {
    'content:file:beforeInsert': async (document) => {
      if (document.extension !== '.md' || !document.image) return

      const { $cloudinary } = require('@nuxtjs/cloudinary')
      const publicId = `${document.slug}-cover`

      /* Get existing image from Cloudinary based on publicId */
      let asset = await $cloudinary.explicit(publicId, {
          type: 'upload'
        })

      /* There is no image uploaded yet, so upload and save it */
      if (!asset) {
        asset = await $cloudinary.upload(
          path.join(__dirname, `content/posts/${document.image}`),
          {
            public_id: publicId,
          }
        )
      }

      /* Replace image with the return object */
      document.image = asset || {}
    },
  }
}

```

On the page component - `posts/_slug.vue` for displaying a single post, we can use `CldImage` to display the uploaded cover image responsively and lazily.

```vue
<template>
  <article>
    <h1>{{document.title}}</h1>
    <cld-image
      v-if="document.image.public_id"
      :alt="document.title"
      quality="auto"
      fetchFormat="auto"
      responsive
      loading="lazy"
    />
    <nuxt-content :document="document" />
  </article>
</template>
<script>
export default {
  async asyncData({ $content, params, error }) {
    const slug = params.slug || ''
    const document = await $content(`posts/${slug}`)
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: 'Page not found', err })
      })
    return { document }
  }
}
</script>
```

> Check out [CldImage documentation](/usage/vue-components#cldimage)

Another approach is to use `$cloudinary.image.url()` to generate the optimized delivery URL and pass it to a regular `img` or `picture` element. The returned URL will already contain basic optimizations (`f_auto` for auto format delivered per browser, and `q_auto` for auto resolution quality per device) by default.

```vue
<template>
  <article>
    <h1>{{document.title}}</h1>
    <img
      v-if="coverImage"
      :src="coverImage"
      loading="lazy"
    >
    <cld-image
      v-if="document.image.public_id"
      :alt="document.title"
      quality="auto"
      fetchFormat="auto"
      responsive
      loading="lazy"
    />
    <nuxt-content :document="document" />
  </article>
</template>
<script>
export default {
  async asyncData({ $content, $cloudinary, params }) {
    const slug = params.slug || ''
    const document = await $content(`posts/${slug}`)
      .fetch()

    const coverImage = document?.image?.public_id ?
      $cloudinary.image.url(document.image.public_id)
      : ''

    return { document, coverImage }
  }
}
</script>

```

> Check out [Image optimization documentation](/usage/optimize-image)
