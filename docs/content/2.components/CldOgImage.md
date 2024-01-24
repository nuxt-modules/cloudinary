---
description: 
---

## Usage

The CldOgImage give you the ability to use the same CldImage API to easily generate Open Graph images (or social cards) inside of Nuxt.

## Basic Usage

The basic required prop is `src`:

```html
<CldOgImage
  src="cld-sample-2"
/>
```

::callout{icon="i-heroicons-exclamation-triangle-20-solid" color="amber"}
CldOgImage does not render an `<img>` tag, meaning it can't be visually embedded on a page. To see the output, please check out the raw HTML of your website
::

The resulting HTML will be applied to the Head of the document:

```html
<meta content="https://res.cloudinary.com/nuxt-cloudinary/image/upload/c_fill,w_2400,h_1254,g_center/c_scale,w_1200/f_jpg/q_auto/cld-sample-2?_a=BBDAACAD0" property="og:image">
<meta content="https://res.cloudinary.com/nuxt-cloudinary/image/upload/c_fill,w_2400,h_1254,g_center/c_scale,w_1200/f_jpg/q_auto/cld-sample-2?_a=BBDAACAD0" property="og:image:secure_url">
<meta content="1200" property="og:image:width">
<meta content="627" property="og:image:height">
<meta content=" " property="twitter:title" />
<meta content="summary_large_image" property="twitter:card">
<meta content="https://res.cloudinary.com/nuxt-cloudinary/image/upload/c_fill,w_2400,h_1254,g_center/c_scale,w_1200/f_webp/q_auto/cld-sample-2?_a=BBDAACAD0" property="twitter:image">
```

You can further take advantage of Cloudinary features like background removal and overlays by adding additional props. The CldOgImage component uses the same API as [CldImage](/components/CldImage), meaning you can use the same transformations and effects.
