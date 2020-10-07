---
title: Build Image URLs & Tags
description: 'How to build dynamic urls for images with Cloudinary'
position: 5
category: Usage
categoryPosition: 2
version: 1
badge: v1.0.0+
---

This module globally injects `$cloudinary` instance.

You can access the APIs for working with images anywhere using `this.$cloudinary.image` (within a component), or `context.$cloudinary.image` (for plugins, `asyncData`, `fetch`, `nuxtServerInit` and middleware).

<alert type="info">

All of the generated delivery URLs are automatically optimized with `q_auto` (auto quality) and `f_auto` (auto format to match the most desired asset format per browser).

</alert>

## `image`

<badge>v1.0.0+</badge>

* Returns an `Object` with methods designated for images.

Below are the available methods of the returned object.

## Methods

### `url(publicId, options?)`

<badge>v1.0.0+</badge>

* `publicId`
  * Type: `String`
  * `required`
* `options`
  * Type: `Object`

Return a `String` as the delivery URL of an image based on its `publicId` and `options` for additional effects/transformations to apply to the original version stored in Cloudinary.

```js
const url = this.$cloudinary.image
                .url('sample', { crop: 'scale', width: 200 })
```

<alert type="info">

Public ID of an asset is the path of that asset in Cloudinary storage.

For example, if you uploaded an asset named `sample.jpg` to folder `examples` in your Cloudinary account, the public ID of that asset is `examples/sample` (with or without extension is acceptable).

</alert>

### `element(publicId, options?)`

<badge>v1.0.0+</badge>

* `publicId`
  * Type: `String`
  * `required`
  * Path to the original image stored in Cloudinary.
* `options`
  * Type: `Object`
  * Additional effects/transformations to apply to the original image on delivery

Return an `Object` containing the following properties:

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
const element = this.$cloudinary.image
                    .element('sample', { crop: 'scale', width: 200 })
                    .toHtml()
```

More information can be found in [the official Cloudinary documentation](https://cloudinary.com/documentation/javascript_image_manipulation).

<alert type="info">

Check out [this snippet](/snippets#imageelement) on how to dynamically generate HTML media element and insert it to your application.

</alert>

### `fetchRemote(url, options?)`

<badge>v1.0.0+</badge>

* `url`
  * Type: `String`
  * `required`
  * Valid URL path to an image
* `options`
  * Type: `Object`
  * Additional effects/transformations to apply to the original image on delivery

Return `String` as the Cloudinary delivery URL for the requested image.

```js
const url = this.$cloudinary.image
              .fetchRemote(
                'https://images6.alphacoders.com/337/337780.jpg',
                { crop: 'scale', width: 200 })
```
