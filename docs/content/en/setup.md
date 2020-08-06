---
title: Setup
description: 'How to install Cloudinary module in Nuxt app'
position: 2
category: Guide
categoryPosition: 2
---

<alert type="info">

To use the module, you need a Cloudinary account first. [Register for a free account](https://cloudinary.com/users/register/free) if you haven't got one yet.

</alert>

You can set up the Cloudinary module easily in two following steps:

## Installation

1. Add `nuxt-cloudinary` dependency to your Nuxt project:

  <code-group>
    <code-block label="Yarn" active>

    ```bash
    yarn add nuxt-cloudinary
    ```

    </code-block>
    <code-block label="NPM">

    ```bash
    npm install nuxt-cloudinary
    ```

    </code-block>
  </code-group>

2. Add `nuxt-cloudinary` as a module in `modules` sections of `nuxt.config.js`:

  ```js[nuxt.config.js]
  export default {
    modules: [
      'nuxt-cloudinary'
    ]
  }
  ```

## Configure

Add `cloudinary` section in `nuxt.config.js` to set configurations for Cloudinary module.

```js[nuxt.config.js]
export default {
  cloudinary: {
    // Cloudinary configuration options
  }
}
```

Then pass **your Cloudinary cloud name** to `cloudName` field option of `cloudinary` section:

```js[nuxt.config.js]
export default {
  cloudinary: {
    cloudName: '<your-cloud-name>'
  }
}
```

See [options](/options) section for all available options to initialize Cloudinary module.

And that's it 🎉! Now you can start [optimizing your images and videos](/usage-build) with Cloudinary!
