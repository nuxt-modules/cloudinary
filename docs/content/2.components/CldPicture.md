# CldPicture.vue

---

## Usage

Using `CldPicture.vue` component is straightforward. It accepts various attributes for configuring responsive images using the `<picture>` element. You can specify different `srcset` values based on media queries for optimal loading on different screen sizes.

```html
<CldPicture :sources="[
  {
    srcset: '/media/cc0-images/surfer-240-200.jpg',
    media: '(min-width: 800px)'
  },
  {
    srcset: '/media/cc0-images/surfer-480-400.jpg',
    media: '(min-width: 1200px)'
  }
]">
  <!-- Additional props for CldPicture -->
</CldPicture>
