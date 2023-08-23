# CldUploadButton.vue

---

The CldUploadButton creates a button element that uses an instance of the [Cloudinary Upload Widget](https://cloudinary.com/documentation/upload_widget) to give you an easy way to add upload capabilities to your Next.js app.

The CldUploadButton component wraps the [CldUploadWidget](/components/clduploadwidget) component providing a pre-defined UI (a button). The same concepts apply, including having the option of using Signed or Unsigned uploads.

## Basic Usage

```html
<CldUploadButton uploadPreset="<Upload Preset>">Upload</CldUploadButton>
```

:upload-button

## Props

CldUploadButton inherits all of the props associated with the [CldUploadWidget](/components/clduploadwidget) component including callback functions except for the `children` option.

In addition, the following props are available:

| Prop Name | Type     | Example                |
| --------- | -------- | ---------------------- |
| className | string   | `"my-button"`          |
| onClick   | function | `function (event) { }` |

`children` are rendered "as is" inside of the `<button>` element if provided, otherwise, the button will include a label of "Upload".

The remaining props are spread onto the `<button>` element for full control of the UI.
