# @nuxtjs/cloudinary

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Cloudinary module for Nuxt

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@nuxtjs/cloudinary` dependency to your project

```bash
yarn add @nuxtjs/cloudinary # or npm install @nuxtjs/cloudinary
```

2. Add `@nuxtjs/cloudinary` to the `modules` section of `nuxt.config.js`

```js
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
{
  modules: [
    // Simple usage
    '@nuxtjs/cloudinary',
  ],
  cloudinary: {
    cloudName: '<your-cloudinary-cloudname',
    /* all other options */
  }
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Created and maintained by [Maya Shavin](https://github.com/mayashavin)

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