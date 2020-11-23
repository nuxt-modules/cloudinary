---
title: Build Video URLs & Tags
description: 'How to build dynamic urls for images with Cloudinary'
position: 6
category: Usage
categoryPosition: 2
version: 1
badge: v1.0.0+
---

This module globally injects `$cloudinary` instance.

You can access the APIs for working with images anywhere using `this.$cloudinary.video` (within a component), or `context.$cloudinary.video` (for plugins, `asyncData`, `fetch`, `nuxtServerInit` and middleware).

<alert type="info">

All of the generated delivery URLs are automatically optimized with `q_auto` (auto quality) and `f_auto` (auto format to match the most desired asset format per browser).

</alert>

## `video`

<badge>v1.0.0+</badge>

* Returns an `Object` with methods designated for videos.

Below are the available methods of the returned object.

## Methods

### `url(publicId, options?)`

<badge>v1.0.0+</badge>

* `publicId`
  * Type: `String`
  * `required`
* `options`
  * Type: `Object`

Return a `String` as the delivery URL of an video based on its `publicId` and `options` for additional effects/transformations to apply to the original version stored in Cloudinary.

```js
const url = this.$cloudinary.video
                .url('dog', { controls: true, crop: 'scale', width: 200, format: 'mp4' })
```

<alert type="info">

Public ID of an asset is the path of that asset in Cloudinary storage.

For example, if you uploaded an asset named `dog.mov` to folder `examples` in your Cloudinary account, the public ID of that asset is `examples/sample` (with or without extension is acceptable).

</alert>

### `element(publicId, options?)`

<>v1.0.0+</>

* `publicId`
  * Type: `String`
  * `required`
  * Path to the original video stored in Cloudinary.
* `options`
  * Type: `Object`
  * Additional effects/transformations to apply to the original video on delivery

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
const element = this.$cloudinary.video
                    .element('dog', { crop: 'scale', width: 200 })
                    .toHtml()
```

More information can be found in [the official Cloudinary documentation](https://cloudinary.com/documentation/javascript_video_manipulation).

<alert type="info">

Check out [this example](/examples#generate-html-element) on how to dynamically generate HTML media element and insert it to your application.

</alert>

### `thumbnail(publidId, options?)`

<badge>v1.0.0+</badge>

* `publicId`
  * Type: `String`
  * `required`
  * Path to the original video stored in Cloudinary.
* `options`
  * Type: `Object`
  * Additional effects/transformations to apply to the thumbnail image generated from original video on delivery

Returns `Object` which contains:

* `url`
  * Type: `String`
  * Delivery URL generated for the requested video as a video thumbnail.

```js
const { url } = this.$cloudinary.video
              .thumbnail(
                'dog',
                { crop: 'scale', width: 200 })
```

<alert type="warning">

Do not pass video extension to `publicId`.

</alert>
