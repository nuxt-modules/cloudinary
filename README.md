[![@nuxtjs/cloudinary](https://v1.cloudinary.nuxtjs.org/preview.png)](https://v1.cloudinary.nuxtjs.org)

# @nuxtjs/cloudinary

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Cloudinary](https://cloudinary.com) integration with for [NuxtJS](https://nuxtjs.org)
> This is a module for version 2.X of Nuxt. If you are looking for Nuxt 3.X support check out the following [branch](https://github.com/nuxt-modules/cloudinary) and the documentation [here](https://cloudinary.nuxtjs.org)

- [✨ &nbsp;Release Notes](https://v1.cloudinary.nuxtjs.org//releases)
- [📖 &nbsp;Documentation](https://v1.cloudinary.nuxtjs.org)

## Features

- On-the-fly url generating for images and videos
- On-the-fly size optimization per browser and device
- Pre-generate url generation for images and videos on build
- Fast loading speed with progressive images
- Auto-detect the optimized format per browser for images and videos
- Dynamically fetch and transform images and videos from remote sources
- Reactive transformations on images and videos
- Upload images and videos
- Minimum configuration required to set up Cloudinary and running

[📖 &nbsp;Read more](https://v1.cloudinary.nuxtjs.org)

## Quick Setup

1. Add `@nuxtjs/cloudinary` dependency to your project

```bash
# using yarn
yarn add @nuxtjs/cloudinary 

# using npm
npm install @nuxtjs/cloudinary
```

2. Add `@nuxtjs/cloudinary` to the `modules` section of `nuxt.config.js`

```js
/// nuxt.config.js
{
  modules: [
    // Simple usage
    '@nuxtjs/cloudinary',

    // With options
    ['@nuxtjs/cloudinary', { /* module options */ }]
  ]
}
```

Or a separate section `cloudinary` for module options:

```js
// nuxt.config.js
{
  modules: [
    // Simple usage
    '@nuxtjs/cloudinary',
  ],
  cloudinary: {
    cloudName: '<your-cloudinary-cloudname>',
    /* all other options */
  }
}
```

See [module options](https://v1.cloudinary.nuxtjs.org/options).

## Build URLs and Tags for images/videos

This module globally injects `$cloudinary` instance to the application. You can access it anywhere using `this.$cloudinary` (within a component), or `context.$cloudinary` (for plugins, `asyncData`, `fetch`, `nuxtServerInit` and middleware).

Simple use example:

```js
const url = this.$cloudinary.image
                .url('sample', { crop: 'scale', width: 200 })
```

See [Usage - Build Image URLs and Tags](https://v1.cloudinary.nuxtjs.org/usage/optimize-image).

## Client components

This module uses the official [Vue components built for Cloudinary](https://github.com/cloudinary/cloudinary-vue) and registers the following components for use in the application: `CldImage`, `CldVideo` and other supportive components. 

See [Usage - Vue components](https://v1.cloudinary.nuxtjs.org/usage/vue-components).

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c)

Maintained by [Maya Shavin](https://github.com/mayashavin)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/cloudinary/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/cloudinary

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/cloudinary.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/cloudinary

[github-actions-ci-src]: https://github.com/nuxt-community/cloudinary-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-community/cloudinary-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/cloudinary-module.svg
[codecov-href]: https://codecov.io/gh/nuxt-community/cloudinary-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/cloudinary.svg
[license-href]: https://npmjs.com/package/@nuxtjs/cloudinary
