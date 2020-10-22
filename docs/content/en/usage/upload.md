---
title: Upload Media Assets
description: "How to upload assets to Cloudinary"
position: 7
category: Usage
categoryPosition: 2
badge: v1.0.0+
version: 1
---

To upload an media asset, you can use `this.$cloudinary.upload` (within a component), or `context.$cloudinary.upload` (for plugins, `asyncData`, `fetch`, `nuxtServerInit` and middleware).

## `upload(file, options, callback)`

<badge>v1.0.0+</badge>

- `file`
  - Type: `String`
  - `required`
  - Path to the target asset file for uploading
- `options`
  - Type: `Object`
  - Configuration options to apply to the target asset during uploading to Cloudinary.
- `callback`
  - Type: `Function`
  - A callback method to trigger once the upload is completed. It is **not** needed if you are using ES6 `async/await` or Promise API.
- Returns a `Promise<Asset | Error>`

<alert type="info">

Check out [Asset API](#asset) to understand the structure of the uploaded asset returned from Cloudinary.

</alert>

Cloudinary module offers two types of upload API - server and client, which are wrapped inside `upload` method, with the same signature. Depending on the current environment (client or server) `upload` is executed, it will automatically trigger the appropriate API behind the scene.

However, there are different parameters **required** per use case. Below are the notes for each use case:

### Server-side Upload (Secured)

<badge>v1.0.0+</badge>

<alert type="warning">

You need to set up both `apiKey` and `apiSecret` globally in `nuxt.config.js` to have server-side upload feature enabled correctly.

</alert>

For server-side, the module use signed upload API for secured and authenticated uploading. Its secure protocol is based on `cloudName`, `apiKey` and `apiSecret`.

Once resolved sucessfully, the method returns an [Asset](#asset) containing information about the uploaded asset, or an `Error` otherwise.

```js
/* Upload to folder `content` and rename the asset to `Example` */
const instance = this.$cloudinary.upload("m-target-file-path", {
  public_id: "Example",
  folder: "content",
});
```

<alert type="info">

See [Optional parameters](https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters) for the full list of available supported properties for `options`.

</alert>

<alert type="info">

You can also [pre-generate transformation](/advanced#pre-generate-media-assets) for uploading asset by passing the desired transformations to `options.eager`.

</alert>

### Client-side Upload (Unsecured)

<badge>v1.0.0+</badge>

To avoid exposing our `apiKey` and `apiSecret`, we can't use the same server-side upload API for client-side. Instead, the module will use the unsigned upload API.

<alert type="warning">

It's **required** to provide `options.upload_preset` per call. Check out [Upload Preset](#upload-preset) to understand what it means and how to create one.

</alert>

Client-side `upload` receives `options` parameter with the following properties:

- `upload_preset`
  - Type: `String`
  - `required`
  - **Unsigned** upload preset defined for your Cloudinary account.
- `public_id`
  - Type: `String`
  - The identifier for accessing the uploaded asset.
- `folder`
  - Type: `String`
  - Folder name where the uploaded asset will be store.
- `tags`
  - Type: `Array<String>`
  - List of tag names to assign to the uploaded asset, such as `['animal', 'dog']`
- `context`
  - Type: `Array<Object>`
  - List of key-value pairs of general textual contet metadata to attach to the uploaded asset.
- `face_coordinates`
  - Type: `Array<Array>`
  - For **images only**
  - List of array of coordinates (`[ x, y, width, height ]`) of faces contained in the uploaded asset. This is for overriding the automatically detected faces.
- `custom_coordinates`
  - Type: `Array<Array>`
  - For **images only**
  - List of array of coordinates (`[ x, y, width, height ]`) of single region contained in the uploaded asset. It is relevant only if you are planning to crop images using `custom` gravity.

Once resolved sucessfully, the method returns an [Asset](#asset) containing information about the uploaded asset, or an `Error` otherwise.

```js
/* Upload to folder `content` and rename the asset to `Example` */
const instance = this.$cloudinary.upload("m-target-file-path", {
  public_id: "Example",
  folder: "content",
  upload_preset: "example_preset",
});
```

<alert type="warning">

Client-side upload using unsigned upload preset is **not** secured, since the upload preset is exposed and can be used with a different account to have resources uploaded to the original account **without approval**.

</alert>

### Client-side Upload (Pre-signed)

<badge>v1.0.0+</badge>

It's possible to secure client-side uploads by generating a signature beforehand, that we pass to the upload request. These uploads _do not_ require you to pass an [upload preset](#upload-preset), but you may still include one if you are using signed upload presets.

<alert type="warning">

Generating a signature requires a server-side environment. This could be done in your own API, or by using a serverless function. See the Cloudinary documentation on [generating authentication signatures](https://cloudinary.com/documentation/upload_images#generating_authentication_signatures) for more details.

</alert>

To generate a valid signature, at the bare minimum you need to pass a unix timestamp. If successful, the signature you receive will be valid for ** 1 hour** after you generated it.

If you plan on passing any additional parameters to your upload (such as `public_id`, `tags`, etc.), you _must_ include them in the signature request.

<alert type="info">

When generating a signature, you do _not_ need to include the `file`, `cloud_name`, `resource_type`, or `api_key` parameters.

</alert>

Once you have successfully generated a signature, you need to pass that signature, along with the timestamp and your Cloudinary API key to the upload request.

```js
/* An example of sending a request to an API to generate
a signature, and then performing an upload */
const options = {
  timestamp: Date.now(),
  public_id: "media/cat.png",
  tags: ["animal", "cat"],
};

const signature = await this.$axios.$post(
  "/api/generate-cloudinary-signature",
  options
);

if (signature) {
  const asset = await this.$cloudinary.upload("m-target-file-path", {
    ...options,
    signature,
    api_key: this.$config.cloudinaryApiKey,
  });
}
```

<alert type="warning">

Note that this **will** expose your Cloudinary API key to the public. Since we are only passing our API **key**, and not our API **secret**, this is generally considered safe, but something to be aware of nonetheless.

</alert>

## Upload Preset

Upload preset is a preset consist of upload parameters defined as default behavior for your uploads. Preset is useful in avoid repeatedly passing these same parameters in `options` every time you call `upload`.

The upload parameters can be tags, pre-generate or on-the-fly transformations, etc.

You can create an upload preset from [Settings page of Cloudinary Console - Upload Tab](https://cloudinary.com/console/settings/upload) as below:

![Add a new upload preset](https://res.cloudinary.com/mayashavin/image/upload/q_auto,f_auto,w_650/v1601902246/nuxt-cld/upload_preset)

There are two modes for an upload preset: `signed` and `unsigned`. Signed upload preset is generally used for secured upload (server-side), while unsigned upload preset allows uploading directly from browser (client-side).

<alert type="warning">

Upload presets have precedence over client-side upload parameters.

</alert>

## `Asset`

<badge>v1.0.0+</badge>

This is the **read-only** object containing an asset's information, which is returned after the asset is uploaded using `upload` or requested using `explicit`.

Below are some main properties:

- `public_id`
  - Type: `String`
  - The asset's public identifier (path to the asset stored in Cloudinary)
- `asset_id`
  - Type: `String`
  - Asset's hashed id
- `format`
  - Type: `String`
  - Original format, such as `.png`, `.jpg`, etc.
- `secure_url`
  - Type: `String`
  - Original delivery URL using HTTPS
- `url`
  - Type: `String`
  - Original unsecured delivery URL (HTTP)
- `type`
  - Type: `String`
  - Asset's delivery type, can be `fetch`, `upload`, `authenticated`, `private`, etc.
- `version`
  - Type: `String`
  - Current version of the asset
- `height`
  - Type: `Number`
  - Asset's height
- `width`
  - Type: `Number`
  - Asset's width
- `eager`
  - Type: `Array<Object>`
  - Pre-generate assets' info based on the eager transformations passed
- `placeholder`
  - Type: `Boolean`
  - Whether there is a placeholder generated
- `tags`
  - Type: `Array`
  - All the tags assigned to the asset
- `original_filename`
  - Type: `String`
  - The original filename when uploading
- `overwritten`
  - Type: `Boolean`
  - Whether it is overwritten (**for upload**)

Example of a returned asset:

```js
{
 public_id: 'sample',
 version: '1312461204',
 width: 864,
 height: 564,
 format: 'jpg',
 created_at: '2017-08-10T09:55:32Z',
 resource_type: 'image',
 tags: [],
 bytes: 9597,
 type: 'upload',
 etag: 'd1ac0ee70a9a36b14887aca7f7211737',
 url: 'http://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
 secure_url: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
 signature: 'abcdefgc024acceb1c1baa8dca46717137fa5ae0c3',
 original_filename: 'sample'
}
```

<alert type="info">

Check out [Upload response](https://cloudinary.com/documentation/upload_images#upload_response) for more information on the full list of properties

</alert>
