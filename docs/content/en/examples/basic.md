---
title: Basic usage examples
description: 'Basic examples of how to use Cloudinary'
position: 9
category: Examples
fullscreen: true
menuTitle: Basic usage
categoryPosition: 3
version: 1
---

All the below examples are done using <badge>v1.0.0+</badge>.

## Securely configure Cloudinary

1. After you run the installation command for `@nuxtjs/cloudinary`, copy and paste the following to your `nuxt.config.js` file:

  ```js[nuxt.config.js]
  cloudinary: {
    cloudName: process.env.CLOUDNAME,
    apiKey: process.env.API_KEY, //only needed if you are using server-side upload
    apiSecret: process.env.API_SECRET, //only needed if you are using server-side upload
  }
  ```

2. Create an `.env` file in your project's root directory with the following details

  ```
  CLOUDNAME=replace_this_with_your_cloudname
  API_KEY=replace_this_with_your_api_key
  API_SECRET=replace_this_with_your_api_secret_key
  ```

<alert type="warning">

Remember to add `.env` to `.gitignore` to avoid commiting and pushing it to remote repo by accident.

</alert>

## Display a Cloudinary-stored image as avatar

You can easily generate a version of your image as a `200x200` in size, round and auto-cropping avatar, with the following steps:

1. Get your asset's `publicId` by clicking on "Link" icon

  ![Copy link icon in Cloudinary](https://res.cloudinary.com/mayashavin/image/upload/f_auto,q_auto/v1603355978/nuxt-cld/copyurl)

  Or you can click on the "Settings" icon

  ![Select Settings](https://res.cloudinary.com/mayashavin/image/upload/f_auto,q_auto/v1603355978/nuxt-cld/settings_select)

  Then select "Copy Url"

  ![Select Copy Url](https://res.cloudinary.com/mayashavin/image/upload/f_auto,q_auto/v1603355978/nuxt-cld/copy_url)

  Finally, delete all the fields in the copied URL except the part `path-to-image` following the below patterns. That's our `publicId`

  ![URL format](https://res.cloudinary.com/mayashavin/image/upload/q_auto,f_auto/v1597083188/articles/cloudinary_url_format)

2. Display the asset using the following code:

### From a local state variable

```vue
<template>
  <div>
    <img :src="src" alt="An image example with Cloudinary" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: this.$cloudinary.image.url(
          'paste-path-to-image-here',
          {
            gravity: 'auto:subject',
            width: '200',
            height: 200,
            crop: 'fill',
          radius: 'max',
          }
        )
    }
  }
}
</script>
```

### From `asyncData`

```vue
<template>
  <div>
    <img :src="src" alt="An image example with Cloudinary" />
  </div>
</template>
<script>
export default {
  asyncData ({ $cloudinary }) {
    const src = this.$cloudinary.image.url(
        'paste-path-to-image-here',
        {
          gravity: 'auto:subject',
          width: '200',
          height: 200,
          crop: 'fill',
          radius: 'max',
        }
      )

    return { src }
  }
}
</script>
```

### From `computed` for dynamic urls

```vue
<template>
  <div>
    <img :src="src" alt="An image example with Cloudinary" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'paste-path-to-image-here'
    }
  },
  computed: {
    src() {
      return this.$cloudinary.image.url(
        this.url,
        {
          gravity: 'auto:subject',
          width: '200',
          height: 200,
          crop: 'fill',
          radius: 'max',
        }
      )
    }
  }
}
</script>
```

For readability and easy maintainance, you can also wrap `this.$cloudinary.image.url` inside a component method and call that method when needed instead:

```vue
<template>
  <div>
    <img :src="src" alt="An image example with Cloudinary" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'paste-path-to-image-here'
    }
  },
  methods: {
    fetchRemote(url, options = {}) {
      return this.$cloudinary.image.url(url, options)
    }
  },
  computed: {
    src() {
      return this.url(
        this.url,
        {
          gravity: 'auto:subject',
          width: '200',
          height: 200,
          radius: 'max',
          crop: 'fill',
        }
      )
    }
  }
}
</script>
```

## Using different account for a specific Cloudinary-stored image

In many cases we want to display images from different Cloudinary cloud/account than the main configured `cloudName`. We can do it with `$cloudinary.config()`.

```vue
<template>
  <div>
    <img :src="src" alt="A remote image example with Cloudinary" />
  </div>
</template>
<script>
const newCloud = 'demo' //replace this with your target account's cloudName

export default {
  async asyncData({ $cloudinary }) {
    const cloudinary = $cloudinary.config({ cloud_name: newCloud })

    const src = cloudinary.image.url('basketball_in_net', {
      width: 200,
      height: 300,
      crop: 'fill',
      gravity: 'auto'
    })
  }
}
</script>
```

The above example code generates an image whose width is 200px, height is 300px. Also it has auto-focus on the main object when cropping using Cloudinary auto detection algorithm.

![Basketball in net](https://res.cloudinary.com/demo/image/upload/c_fill,f_auto,g_auto,h_300,q_auto,w_200/basketball_in_net)

<alert type="info">

Note that the original instance's configurations stay the same. `this.$cloudinary.image.url()` will use the default settings given in `nuxt.config.js` in the installation.

</alert>

## Display a remote image via Cloudinary

Let's fetch the below remote image via Cloudinary:

![A remote image example with Cloudinary](https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png)

And display it as `200x200` in size, round and auto-cropping avatar:

![A fetched and optimized image](https://res.cloudinary.com/mayashavin/image/fetch/c_fill,f_auto,g_auto:subject,h_200,q_auto,w_200,r_max/https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png)

### From a local state variable

```vue
<template>
  <div>
    <img :src="src" alt="A remote image example with Cloudinary" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: this.$cloudinary.image.fetchRemote(
          'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
          {
            gravity: 'auto:subject',
            width: '200',
            height: 200,
            crop: 'fill',
            radius: 'max',
          }
        )
    }
  }
}
</script>
```

### From `asyncData`

```vue
<template>
  <div>
    <img :src="src" alt="A remote image example with Cloudinary" />
  </div>
</template>
<script>
export default {
  asyncData ({ $cloudinary }) {
    const src = this.$cloudinary.image.fetchRemote(
        'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
        {
          gravity: 'auto:subject',
          width: '200',
          height: 200,
          crop: 'fill',
          radius: 'max',
        }
      )

    return { src }
  }
}
</script>
```

### From `computed` for dynamic urls

```vue
<template>
  <div>
    <img :src="src" alt="A remote image example with Cloudinary" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
    }
  },
  computed: {
    src() {
      return this.$cloudinary.image.fetchRemote(
        this.url,
        {
          gravity: 'auto:subject',
          width: '200',
          height: 200,
          crop: 'fill',
          radius: 'max',
        }
      )
    }
  }
}
</script>
```

For readability and easy maintainance, you can also wrap `this.$cloudinary.image.url` inside a component method and call that method when needed instead:

```vue
<template>
  <div>
    <img :src="src" alt="A remote image example with Cloudinary" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
    }
  },
  methods: {
    fetchRemote(url, options = {}) {
      return this.$cloudinary.image.fetchRemote(url, options)
    }
  },
  computed: {
    src() {
      return this.fetchRemote(
        this.url,
        {
          gravity: 'auto:subject',
          width: '200',
          height: 200,
          crop: 'fill',
          radius: 'max',
        }
      )
    }
  }
}
</script>
```
