---
title: Using Upload
description: 'Basic examples of how to use Cloudinary upload'
position: 11
category: Examples
menuTitle: Upload
version: 1
---

First, please [follow the instructions](/examples/basic#securely-configure-cloudinary) to install and setup Cloudinary module.

## Client unsigned upload component with Cloudinary

1. Create an upload component `Upload.vue` with the following template code:

  ```vue[Upload.vue]
  <template>
    <div>
      <span>Upload to Cloudinary</span>
      <input
        type="file"
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
        aria-label="upload image button"
        @change="selectFile"
      />
    </div>
  </template>
  ```

  We assign to the `input` element to receive input type `file` and specify accepted file extensions. Then we attach `selectFile` method to the `change` event listener. This function will be triggered whenever user selects a file to upload.

2. Implement the following code for `selectFile`.

  ```vue[Upload.vue]
  <script>
  export default {
    methods: {
      async selectFile(e) {
        const file = e.target.files[0];

        /* Make sure file exists */
        if (!file) return;

        /* create a reader */
        const readData = (f) =>  new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(f);
        });

        /* Read data */
        const data = await readData(file);

        /* upload the converted data */
        const instance = this.$cloudinary.upload(data, {
          folder: 'upload-examples',
          uploadPreset: 'your-upload-preset',
        })
      }
    }  
  }
  </script>
  ```