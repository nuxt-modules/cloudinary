---
description: 
---

The CldUploadWidget creates a new instance of the [Cloudinary Upload Widget](https://cloudinary.com/documentation/upload_widget) giving you an easy way to add upload capabilities to your Nuxt app.

## Basic Usage

The CldUploadWidget will not render any UI by default. It will instead only render what's returned from the slot (see more below).

There are two options when using the CldUploadWidget: signed and unsigned. These options allow you to control the amount of security and restrictions you place on uploads.

::callout{icon="i-heroicons-light-bulb"}
To learn more about signed and unsigned upload, check out the [Cloudinary docs](https://cloudinary.com/documentation/upload_images#uploading_assets_to_the_cloud).
::

### Unsigned

To give unsigned access for upload, provide an upload preset as part of the component configuration.

::callout{icon="i-heroicons-exclamation-triangle-20-solid" color="amber"}
Note: The upload preset requires that unsigned uploads are permitted.
::

Use the following to generate an unsigned upload widget:

```html
<CldUploadWidget v-slot="{ open }" uploadPreset="nuxt-cloudinary-unsigned">
  <button type="button" @click="open">Upload an Image</button>
</CldUploadWidget>
```

:upload-widget

### Signed

Signing upload requests requires passing in an endpoint to the component.

You can do this by creating a serverless function that reads the parameters as the body and returns an object with the signature.

Use the following to generate an signed upload widget:

```html
<CldUploadWidget
  v-slot="{ open }"
  signatureEndpoint="<API Endpoint (ex: /api/sign-cloudinary-params)>"
>
  <button type="button" @click="open">Upload an Image</button>
</CldUploadWidget>
```

Here's an example of how you could process the signature in an API endpoint that signs a request:

```js
import { v2 as cloudinary } from "cloudinary";

export default eventHandler(async (event) => {
  const signature = cloudinary.utils.api_sign_request(
    body.paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  return { signature };
});
```

To use the above, create a Node-based API route, add the snippet, and use that endpoint as the `signatureEndpoint` prop.

## General Props

| Prop Name         | Type     | Example                            |
| ----------------- | -------- | ---------------------------------- |
| children          | function | `{ (options) => {} }`              |
| options           | object   | `{ encryption: {...} }`            |
| signatureEndpoint | string   | `"/api/sign-cloudinary-params.js"` |
| uploadPreset      | string   | `"my-upload-preset"`               |

## Event Props

| Prop Name        | Type     | Example                    |
| ---------------- | -------- | -------------------------- |
| onError          | function | `(error, widget) => { }`   |
| onOpen           | function | `(widget) => { }`          |
| onUpload         | function | `(result, widget) => { }`  |
| onAbort          | function | `(result, options) => { }` |
| onBatchCancelled | function | `(result, options) => { }` |
| onClose          | function | `(widget) => { }`          |
| onDisplayChanged | function | `(result, options) => { }` |
| onPublicId       | function | `(result, options) => { }` |
| onQueuesEnd      | function | `(result, options) => { }` |
| onQueuesStart    | function | `(result, options) => { }` |
| onRetry          | function | `(result, options) => { }` |
| onShowCompleted  | function | `(result, options) => { }` |
| onSourceChanged  | function | `(result, options) => { }` |
| onSuccess        | function | `(result, options) => { }` |
| onTags           | function | `(result, options) => { }` |
| onUploadAdded    | function | `(result, options) => { }` |

To learn more about the event callbacks and when they trigger, see: https://cloudinary.com/documentation/upload_widget_reference#events

### Callback Options

Most of the callbacks provide a set of options that give access to the widget instance and allow more interaction.

| Name               | Type     | Description                                            |
| ------------------ | -------- | ------------------------------------------------------ |
| widget             | Widget   | The widget instance attached to the current component. |
| [Instance Methods] | function | See below.                                             |
