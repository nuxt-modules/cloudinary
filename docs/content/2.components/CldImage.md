# CldImage.vue

---

## Usage

Using `CldImage.vue` component is really straight forward. It accepts the same attributes as native img tag (such us sizes, width, loading, etc) and bunch of Cloudinary specific props used to optimize the image (such as removeBackground, overlays, gravity, etc). Thanks to the auto import feature of Nuxt, you do not need to import anything. Just add `<CldImage />` to your template and optimize your images!

:image-with-overlays{style="text-align: center; margin: 0 auto"}

```html
<CldImage
  width="987"
  height="987"
  src="images/woman-headphones"
  sizes="50vw"
  crop="thumb"
  gravity="faces"
  removeBackground
  tint="40:253f8c"
  :underlay="'images/city-skyline'"
  :overlays="[
    {
      position: {
        gravity: 'north',
        y: 60
      },
      text: {
        color: 'rgb:52a4ff80',
        fontFamily: 'Source Sans Pro',
        fontSize: 320,
        fontWeight: 'black',
        text: 'MUSIC',
        letterSpacing: -10,
        lineSpacing: -100,
        stroke: true,
        border: '20px_solid_rgb:2d0eff99',
      }
    },
    {
      position: {
        gravity: 'south',
        y: 60
      },
      text: {
        color: 'rgb:52a4ff80',
        fontFamily: 'Source Sans Pro',
        fontSize: 320,
        fontWeight: 'black',
        text: 'IS LIFE',
        letterSpacing: -10,
        lineSpacing: -100,
        stroke: true,
        border: '20px_solid_rgb:2d0eff99',
      }
    }
  ]"
/>
```

## Configuration

Configuration for CldImage is the same as [useCldImageUrl](/composables/useCldImageUrl), which both use the same underlying API.

## General Props

| Prop Name               | Type               | Default       | Example                       |
| ----------------------- | ------------------ | ------------- | ----------------------------- |
| crop                    | string             | `"limit"`     | `"thumb"`                     |
| deliveryType            | string             | `"upload"`    | `"fetch"`                     |
| effects                 | array              | -             | `[{ background: 'blue' }]`    |
| format                  | string             | `"auto"`      | `"webp"`                      |
| gravity                 | string             | `"auto"`      | `"faces"`                     |
| height                  | number/string      | -             | `600`                         |
| overlays                | array              | -             | See Below                     |
| preserveTransformations | string             | `false`       | `true`                        |
| quality                 | string             | `"auto"`      | `"90"`                        |
| rawTransformations      | array              | -             | `['e_blur:2000']`             |
| removeBackground        | bool/string        | `false`       | `true`                        |
| sanitize                | bool               | `true` if svg | `true` (Applies only to SVG)  |
| seoSuffix               | string             | -             | `my-image-content`            |
| src                     | string             | -             | `"my-public-id"`              |
| text                    | string             | -             | `"Next Cloudinary"`           |
| transformations         | string/array       | -             | `['my-named-transformation']` |
| underlay                | string             | -             | `"my-public-id"`              |
| underlays               | array              | -             | See Below                     |
| version                 | number             | -             | `1234`                        |
| width                   | number/string      | -             | `600`                         |
| zoom                    | string             | -             | `0.5`                         |
| zoompan                 | bool/string/object | -             | See Below                     |
| fillBackground          | bool/object        | -             | `true`                        |

## Effect Props

All effect props are disabled by default.

| Prop Name          | Type          | Example                                              |
| ------------------ | ------------- | ---------------------------------------------------- |
| art                | string        | `"al_dente"`                                         |
| autoBrightness     | bool/string   | `true`, `"80"`                                       |
| autoColor          | bool/string   | `true`, `"80"`                                       |
| autoContrast       | bool/string   | `true`, `"80"`                                       |
| assistColorblind   | bool/string   | `true`, `"20"`, `"xray"`                             |
| background         | string        | `"blue"`                                             |
| blackwhite         | bool/string   | `true`, `"40"`                                       |
| blur               | bool/string   | `true`, `"800"`                                      |
| blurFaces          | bool/string   | `true`, `"800"`                                      |
| blurRegion         | bool/string   | `true`, `"1000,h_425,w_550,x_600,y_400"`             |
| border             | string        | `"5px_solid_purple"`                                 |
| brightness         | bool/string   | `true`, `"100"`                                      |
| brightnessHSB      | bool/string   | `true`, `"100"`                                      |
| cartoonify         | bool/string   | `true`, `"70:80"`                                    |
| color              | string        | `"blue"`                                             |
| colorize           | string        | `"35,co_darkviolet"`                                 |
| contrast           | bool/string   | `true`, `"100"`, `"level_-70"`                       |
| distort            | string        | `"150:340:1500:10:1500:1550:50:1000"`, `"arc:180.0"` |
| fillLight          | bool/string   | `true`, `"70:20"`                                    |
| gamma              | bool/string   | `true`, `"100"`                                      |
| gradientFade       | bool/string   | `true`, `"symmetric:10,x_0.2,y_0.4"`                 |
| grayscale          | bool          | `true`                                               |
| improve            | bool/string   | `true`, `"50"`, `"indoor"`                           |
| multiply           | bool          | `true`                                               |
| negate             | bool          | `true`                                               |
| oilPaint           | bool/string   | `true`, `"40"`                                       |
| opacity            | number/string | `40`, `"40"`                                         |
| outline            | bool/string   | `true`, `"40"`, `"outer:15:200"`                     |
| overlay            | bool          | `true`                                               |
| pixelate           | bool/string   | `true`, `"20"`                                       |
| pixelateFaces      | bool/string   | `true`, `"20"`                                       |
| pixelateRegion     | bool/string   | `true`, `"35,h_425,w_550,x_600,y_400"`               |
| redeye             | bool/string   | `true`                                               |
| replaceColor       | string        | `"saddlebrown"`, `"2F4F4F:20"`, `"silver:55:89b8ed"` |
| saturation         | bool/string   | `true`, `"70"`                                       |
| screen             | bool          | `true`                                               |
| sepia              | bool/string   | `true`, `"50"`                                       |
| shadow             | bool/string   | `true`, `"50,x_-15,y_15"`                            |
| sharpen            | bool/string   | `true`, `"100"`                                      |
| shear              | string        | `"20.0:0.0"`                                         |
| simulateColorblind | bool/string   | `"deuteranopia"`                                     |
| trim               | bool/string   | `true`, `"50:yellow"`                                |
| tint               | bool/string   | `true`, `"100:red:blue:yellow"`                      |
| unsharpMask        | bool/string   | `true`, `"500"`                                      |
| vectorize          | bool/string   | `true`, `"3:0.5"`                                    |
| vibrance           | bool/string   | `true`, `"70"`                                       |
| vignette           | bool/string   | `true`, `"30"`                                       |

[View the Cloudinary docs](https://cloudinary.com/documentation/transformation_reference#e_effect) to see learn more about using effects.

## Overlay Props

The `overlays` prop is an array of objects with the following configuration options:

| Property Name  | Type   | Example                                          |
| -------------- | ------ | ------------------------------------------------ | -------------------------------- |
| appliedEffects | array  | Same as effects, added as applied transformation |
| effects        | array  | See Below                                        |
| position       | object | See Below                                        |
| publicId       | string | `"thumb"`                                        |
| text           | object | string                                           | `"Next Cloudinary"` or See Below |
| url            | string | `"https://.../image.jpg"`                        |

The position property can include:

| Property Name | Type   | Example        |
| ------------- | ------ | -------------- |
| angle         | number | `45`           |
| gravity       | string | '"north_west"' |
| x             | number | `10`           |
| y             | number | `10`           |

Objects in the effects array can include everything in the effects options above as well as:

| Property Name | Type   | Example        |
| ------------- | ------ | -------------- |
| aspectRatio   | string | `"3.0"`        |
| crop          | string | `10`           |
| gravity       | string | '"north_west"' |
| height        | number | '600'          |
| width         | number | '600'          |

The text property can include:

| Property Name  | Type   | Example                            |
| -------------- | ------ | ---------------------------------- |
| border         | string | `"20px_solid_blue"`                |
| color          | string | `"blueviolet"`                     |
| fontFamily     | string | `"Open Sans"`                      |
| fontSize       | number | `48`                               |
| fontWeight     | string | `"bold"`                           |
| letterSpacing  | number | `"14"`                             |
| lineSpacing    | number | `"14"`                             |
| stroke         | bool   | `true` in coordination with Border |
| textDecoration | string | `"underline"`                      |

## Examples

Below, you can see examples of usage of various effects that you can use from Cloudinary:

### Zoompan

```html
zoompan="loop"
```

:cld-image{src="cld-sample-5" width="900" zoompan="loop" height="900" alt="test" style="text-align: center; margin: 0 auto"}

### Blur

```html
blur="1200"
```

:cld-image{src="cld-sample-5" width="900" blur="1200" height="900" alt="test" style="text-align: center; margin: 0 auto"}

### Pixelate

```html
pixelate
```

:cld-image{src="cld-sample-5" width="900" pixelate height="900" alt="test" style="text-align: center; margin: 0 auto"}

### Grayscale

```html
grayscale
```

:cld-image{src="cld-sample-5" width="900" grayscale height="900" alt="test" style="text-align: center; margin: 0 auto"}

### Tint

```html
tint="equalize:80:blue:blueviolet"
```

:cld-image{src="cld-sample-5" width="900" tint="equalize:80:blue:blueviolet" height="900" alt="test" style="text-align: center; margin: 0 auto"}

### Opacity

```html
opacity="50"
```

:cld-image{src="cld-sample-5" width="900" opacity="50" height="900" alt="test" style="text-align: center; margin: 0 auto"}

### Shear

```html
shear="40:0"
```

:cld-image{src="cld-sample-5" width="900" shear="40:0" height="900" alt="test" style="text-align: center; margin: 0 auto"}

### Border

```html
border="40px_solid_purple"
```

:cld-image{src="cld-sample-5" width="900" border="40px_solid_purple" height="900" alt="test" style="text-align: center; margin: 0 auto"}

### fillBackground

```html
fillBackground
```

:cld-image{src="cld-sample-5" width="1200" height="1200" alt="test" fillBackground style="text-align: center; margin: 0 auto"}

### Multiple Effects

```html
:effects="[ { background: 'green' }, { gradientFade: true }, { gradientFade:
'symetric,x_0.5' } ]"
```

:image-with-effects{style="text-align: center; margin: 0 auto"}
