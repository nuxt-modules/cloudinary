---
title: Advanced 
description: 'Advanced usage of Cloudinary module'
position: 9
category: Usage
badge: v1.0.0+
version: 1
---

## Programmatic Usage

<badge>v1.0.0+</badge>

`$cloudinary` is accessible from **@nuxjs/cloudinary**

<alert type="warning">

Beware that you can only access the instance after Nuxt loads the module. 
Hence `require('@nuxtjs/cloudinary')` should happen in hooks or internal Nuxt methods.

</alert>

```js[nuxt.config.js]
import path from 'path'
import fs from 'fs'

export default{
  modules: [
    '@nuxtjs/cloudinary'
  ],
  cloudinary: {
    cloudName: 'your-cloud-name',
  },
  hooks: {
    build: {
      before() {
        const { $cloudinary } = require('@nuxtjs/cloudinary')
        const assetsFolder = path.join(__dirname, 'assets/images')

        fs.readdir(assetsFolder, async (err, files) => {
          if (err) return

          /* Upload to Cloudinary */
          const uploadedAssets = await Promise.all(
            files.map((file) =>
              $cloudinary.upload(path.join(assetsFolder, file))
            )
          )

          /* Do something with the assets' info returned */
          console.log(uploadedAssets)
        })
      }
    }
  }
}

```

## Using with `@nuxt/content` Hooks

<badge>v1.0.0+</badge>

Since [**@nuxt/content module**](https://content.nuxtjs.org/advanced) adds some useful hooks,
 we can use them together with Cloudinary module for better content optimization.

**Example 1:**

When building a blog, we can use one of the hook to retrieve the cover image's original URL via `image` field defined in YAML front matter block, as below:

```yaml
---
title: Hello World
image: https://images6.alphacoders.com/337/337780.jpg
---
```

Then use one of the following approach to have the cover image optimized

### With `image.fetchRemote`

We can use `content:file:beforeInsert` hook to retrieve the cover image's original URL, and:

* Fetch a optimized version through Cloudinary using `$cloudinary.image.fetchRemote`
* Replace the original URL in the document with the new URL version.

```js[nuxt.config.js]
export default {
  modules: [
    '@nuxtjs/cloudinary',
    '@nuxt/content'
  ],
  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension !== '.md' || !document.image) return

      const { $cloudinary } = require('@nuxtjs/cloudinary')

      document.image = $cloudinary.image.fetchRemote(document.image)
    },
  }
}
```

<alert type="info">

`fetchRemote` only works if the original URL is a **valid remote URL**. For local file, use the `upload` method instead.

</alert>

### With `upload`

Similarly, after retrieving the cover image's original URL, we can:

* Check if the image has been uploaded to your Cloudinary account and retrieve the existing image information by using `explicit`
* Else, upload the original file to Cloudinary with a dedicated options, such as `public_id` using `$cloudinary.upload`
* Replace the original image value in the document with the new information.

```js[nuxt.config.js]
export default {
  modules: [
    '@nuxtjs/cloudinary',
    '@nuxt/content'
  ],
  hooks: {
    'content:file:beforeInsert': async (document) => {
      if (document.extension !== '.md' || !document.image) return

      const { $cloudinary } = require('@nuxtjs/cloudinary')

      /* Get existing image from Cloudinary based on publicId */
      let asset = await $cloudinary.explicit(document.slug, {
        type: 'upload', //only check uploaded assets
      })

      /* There is no image uploaded yet, so upload and save it */
      if (!asset) {
        asset = await $cloudinary.upload(
          path.join(__dirname, `content/${document.image}`),
          {
            public_id: document.slug,
          }
        )
      }

      /* Get the secured delivery URL */
      document.image = asset.secure_url || document.image
    },
  }
}
```

<alert type="info">

If you want to use Cloudinary component `CldImage` to display the cover image, map `document.image` to `asset.public_id` instead of `asset.secure_url`.

</alert>