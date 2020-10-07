---
title: Build URLs and Tags
description: 'How to build dynamic urls with Cloudinary'
position: 10
category: Before v1.0.0
categoryPosition: 4
---

<alert type="warning">

This API is deprecated in v1.0.0+. Please refer to [Cloudinary instance API](/usage/cloudinary-instance) for the updated API instead.

</alert>

This module globally injects `$cloudinary` instance. You can access it anywhere using `this.$cloudinary` (within a component), or `context.$cloudinary` (for plugins, `asyncData`, `fetch`, `nuxtServerInit` and middleware).

<alert>

From `<v1.0.0`, this instance is only available when `useComponent` is set to `false` in `nuxt.config.js`.

</alert>

## Methods

## `$cloudinary(assetType?)`

<alert type="warning">
Deprecated in v1.0.0+
</alert>

* `assetType`
  * Type: `String`
  * Default: `image`
  * Accepted values: `image`, `video`
* Return an `Object` with methods designated for certain asset type passed (image or video).

Below are the available methods of the returned object.

## `url(publicId, options?)`

<alert type="warning">

Deprecated in v1.0.0+. Please refer to `url` method designated for [Image](/usage/optimize-image#urlpublicid-options) and [Video](/usage/optimize-video#urlpublicid-options) separately.

</alert>

* `publicId`
  * Type: `String`
  * `required`
* `options`
  * Type: `Object`

Return a `String` as the delivery URL of an asset (image or video) based on its `publicId` and `options` for additional effects/transformations to apply to the original version stored in Cloudinary.

```js
const url = this.$cloudinary()
                .url('sample', { crop: 'scale', width: 200 })
```

<alert type="info">

Public ID of an asset is the path of that asset in Cloudinary storage.

For example, if you uploaded an asset named `sample.jpg` to folder `examples` in your Cloudinary account, the public ID of that asset is `examples/sample` (with or without extension is acceptable).

</alert>

## `element(publicId, options?)`

<alert type="warning">

Deprecated in v1.0.0+. Please refer to `element` method designated for [Image](/usage/optimize-image#elementpublicid-options) and [Video](/usage/optimize-video#elementpublicid-options) separately.

</alert>

* `publicId`
  * Type: `String`
  * `required`
  * Path to the original asset stored in Cloudinary.
* `options`
  * Type: `Object`
  * Additional effects/transformations to apply to the original asset on delivery

Returns an `Object` containing the following properties:

* `name`
  * Type: `String`
  * HTML element for the created media element - `video` or `img`
* `publicId`
  * Type: `String`
  * Path to the original asset stored in Cloudinary.
* `transformation()`
  * Type: `Function`
  * Returns an `Object` containing the given effects/transformations.
* `toHtml()`
  * Type: `Function`
  * Return a `String` as HTML media tag with the generated delivery URL.
* `toDOM()`
  * Type: `Function`
  * Return a DOM element to inject the DOM tree dynamically.

```js
const element = this.$cloudinary()
                    .element('sample', { crop: 'scale', width: 200 })
                    .toHtml()
```

More information can be found in [the official Cloudinary documentation](https://cloudinary.com/documentation/javascript_image_manipulation).

<alert type="info">

Check out [this example](/examples#generate-html-element) on how to dynamically generate HTML media element and insert it to your application.

</alert>

## `fetchRemote(url, options?)`

<alert type="warning">

Deprecated in v1.0.0+. Please refer to `fetchRemote` method designated for [Image](/usage/optimize-image#fetchremoteurl-options).

</alert>

* `url`
  * Type: `String`
  * `required`
  * Valid URL path to an image or video
* `options`
  * Type: `Object`
  * Additional effects/transformations to apply to the original asset on delivery

Returns `String` as the Cloudinary delivery URL for the requested asset.

```js
const url = this.$cloudinary()
              .fetchRemote(
                'https://images6.alphacoders.com/337/337780.jpg',
                { crop: 'scale', width: 200 })
```

## `config(options)`

<alert type="warning">

Deprecated in v1.0.0+. Please refer to the new method signature in [Cloudinary instance](/usage/cloudinary-instance#configoptions).

</alert>

* `options`
  * Type: `Object`
  * Configuration options for Cloudinary.

Overwrite the default Cloudinary configurations setup defined in `nuxt.config.js`.

```js
const url = this.$cloudinary()
                .config({
                  cloudName: 'your-new-cloud-name'
                })
```

<alert type="info">

See [Cloudinary options](/options#cloudinary-options) for the full list of available options.

</alert>
