---
title: Cloudinary Instance
description: 'How to use the Cloudinary module'
position: 4
category: Usage
categoryPosition: 2
---

This module globally injects `$cloudinary` instance. You can access it anywhere using `this.$cloudinary` (within a component), or `context.$cloudinary` (for plugins, `asyncData`, `fetch`, `nuxtServerInit` and middleware).

<alert>

From `v1.0.0+`, this instance is also available when `useComponent` is set to `true` in `nuxt.config.js`.

</alert>

<alert type="warning">

If you are using `v0.0.11` and older, please check out [Deprecated API](/before-v1.0.0/build-urls-and-tags) instead.

</alert>

## `$cloudinary` <badge>v1.0.0+</badge>

* Returns an `CloudinaryApi` instance designated according the setup options.

Below are the available properties and methods of the returned object.

## Properties

## `image` <badge>v1.0.0+</badge>

* Returns an `Object` with methods designated for images. 

See [Image URLs and Tags](/usage/optimize-image) for the full list of available methods.

## `video` <badge>v1.0.0+</badge>

* Returns an `Object` with methods designated for images. 

See [Video URLs and Tags](/usage/optimize-video) for the full list of available methods.

## Methods

## `upload(file, options, callback)` <badge>v1.0.0+</badge>

* `file`
  * Type: `String`
  * `required`
  * Path to the target asset file for uploading
* `options`
  * Type: `Object`
  * Configuration options to apply to the target asset during uploading to Cloudinary.
* `callback`
  * Type: `Function`
  * A callback method to trigger once the upload is completed. It is **not** needed if you are using ES6 `async/await` or Promise API.
* Returns: a `Promise<Asset | Error>`

Upload the target asset file to Cloudinary, in a secured (server-side) or non-secure (client-side), depending on the use case.

<alert type="info">

See [Upload assets](/usage/upload) for the full specs and examples.

</alert>

```js
const instance = this.$cloudinary
                .upload('my-target-file-path', {
                  public_id: 'Example'
                })
```
<alert type="info">

You can [pre-generate transformation](/advanced#pre-generate-media-assets) for uploading asset by passing the desired transformations to `options.eager`.

See [Optional parameters](https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters) for the full list of available supported properties for `options`.

</alert>

## `explicit(publicId, options)` <badge>v1.0.0+</badge>

<alert type="warning">

This method is **only available** on server-side. Calling it on client-side during run time will cause error.

</alert>

* `publicId`
  * Type: `String`
  * `required`
  * Path to the original asset stored in Cloudinary.
* `options`
  * Type: `Object`
  * `options.type` is `required`.

<alert type="info">

Some common accepted values for `type` are `upload`, `private`, `authenticated`, `fetch`, and `multi`. See [Cloudinary delivery types](https://cloudinary.com/documentation/image_transformations#delivery_types) for full list of available values.

</alert>

Returns an `Object` contains information of found asset, or `null` if the target asset doesn't exist.

```js
const instance = this.$cloudinary
                .explicit('my-target-public-id', {
                  type: 'upload'
                })
```

<alert type="info">

You can [pre-generate transformation](/advanced#pre-generate-media-assets) for existed asset by passing the desired transformations to `options.eager`.

See [Optional parameters](https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters-6) for the full list of available supported properties for `options`.

</alert>

## `config(options)`

* `options`
  * Type: `Object`
  * Configuration options for Cloudinary.
* Returns a new `CloudinaryApi` instance for chaining <badge>v1.0.0+</badge>

Create a new `CloudinaryApi` instance from the default setup defined in `nuxt.config.js` and the passed `options`.

```js
const instance = this.$cloudinary
                .config({
                  cloudName: 'your-new-cloud-name'
                })
```

<alert type="info">

See [Cloudinary options](/options#cloudinary-options) for the full list of available options.

</alert>
