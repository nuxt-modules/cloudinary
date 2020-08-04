# nuxt-cloudinary

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Cloudinary module for Nuxt

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-cloudinary` dependency to your project

```bash
yarn add nuxt-cloudinary # or npm install nuxt-cloudinary
```

2. Add `nuxt-cloudinary` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'nuxt-cloudinary',

    // With options
    ['nuxt-cloudinary', { /* module options */ }]
  ]
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Maya Shavin <maya@cloudinary.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-cloudinary/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-cloudinary

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-cloudinary.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-cloudinary

[github-actions-ci-src]: https://github.com/mayashavin/nuxt-cloudinary/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/mayashavin/nuxt-cloudinary/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/mayashavin/nuxt-cloudinary.svg
[codecov-href]: https://codecov.io/gh/mayashavin/nuxt-cloudinary

[license-src]: https://img.shields.io/npm/l/nuxt-cloudinary.svg
[license-href]: https://npmjs.com/package/nuxt-cloudinary
