---
description: 
---

## The usage

The CldVideoPlayer component helps to embed Cloudinary videos using the [Cloudinary Video Player](https://cloudinary.com/documentation/cloudinary_video_player) giving you a full customizable experience for your player.

## Basic Usage

The basic required props include `width`, `height`, and `src`:

```html
<CldVideoPlayer width="1920" height="1080" src="<Public ID>" />
```

:cld-video-player{src="videos/mountain-stars" width="900" height="900" style="aspect-ratio: 1620 / 1080"}

## Customization

You can further take advantage of features like customizing your player:

```html
<template>
  <CldVideoPlayer
    width="1620"
    height="1080"
    src="videos/mountain-stars"
    :colors="colors"
    fontFace="Source Serif Pro"
  />
</template>

<script setup lang="ts">
  const colors = {
    accent: "#ff0000",
    base: "#00ff00",
    text: "#0000ff",
  };
</script>
```

:colored-video-player

## Player Events

Or listening to player events for advanced interactions with:

```html
<CldVideoPlayer
  width="600"
  height="600"
  src="<Cloudinary URL>"
  :onMetadataLoad="({ player }) => console.log(`duration: ${player.duration()}`)"
  :onPause="({ player }) => console.log(`current time: ${player.currentTime()}`)"
/>
```

::callout{icon="i-heroicons-light-bulb"}
Check the browser console after playing and pausing the video for logs that were added to the component.
::

:video-player-with-events

## General Props

| Prop Name      | Type           | Default   | Description                                                                                                                                                                      | Example                                     |
| -------------- | -------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| autoPlay       | string         | `"never"` | When, if, should the video automatically play. See `autoplayMode` in [Video Player docs](https://cloudinary.com/documentation/video_player_api_reference#constructor_parameters) | `"on-scroll"`                               |
| className      | string         | -         | Additional class names added to the video container                                                                                                                              | `"my-video-player"`                         |
| colors         | object         | See below | Player chrome colors                                                                                                                                                             | See Colors Below                            |
| controls       | boolean        | `true`    | Show player controls                                                                                                                                                             | `true`                                      |
| fontFace       | string         | -         | Player UI font. Uses Google Fonts.                                                                                                                                               | `"Source Serif Pro"`                        |
| height         | string/number  | -         | **Required**: Player height                                                                                                                                                      | `1080`                                      |
| id             | string         | -         | Video instance ID, defaults to src value                                                                                                                                         | `"my-video"`                                |
| logo           | boolean/object | See Below | Logo to display in Player UI                                                                                                                                                     | See Logo Below                              |
| loop           | boolean        | `false`   | Loop the video                                                                                                                                                                   | `true`                                      |
| muted          | boolean        | `false`   | Load muted by default                                                                                                                                                            | `true`                                      |
| onDataLoad     | Function       | -         | Triggered when video metadata is loaded                                                                                                                                          | See Events Below                            |
| onError        | Function       | -         | Triggered on video error                                                                                                                                                         | See Events Below                            |
| onMetadataLoad | Function       | -         | Triggered when video data is loaded                                                                                                                                              | See Events Below                            |
| onPause        | Function       | -         | Triggered on video pause                                                                                                                                                         | See Events Below                            |
| onPlay         | Function       | -         | Triggered on video play                                                                                                                                                          | See Events Below                            |
| onEnded        | Function       | -         | Triggered when video has ended play                                                                                                                                              | See Events Below                            |
| playerRef      | Ref            | -         | React ref to access Player instance                                                                                                                                              | See Refs Below                              |
| showLogo       | boolea         | `true`    | Show the Cloudinary logo on Player                                                                                                                                               | `false`                                     |
| src            | string         | -         | **Required**: Video public ID                                                                                                                                                    | `"videos/my-video"`                         |
| transformation | object/array   | -         | Transformations to apply to the video                                                                                                                                            | `{ width: 200, height: 200, crop: 'fill' }` |
| version        | string         | `"1.9.4"` | Cloudinary Video Player version                                                                                                                                                  | `"1.9.4"`                                   |
| videoRef       | Ref            | -         | React ref to access video element                                                                                                                                                | See Refs Below                              |
| width          | string/number  | -         | **Required**: Player width                                                                                                                                                       | `1920`                                      |

## Colors Prop

The `colors` prop takes an object that can control what colors are used in the player:

| Prop Name | Type   | Default     | Description                                                                              |
| --------- | ------ | ----------- | ---------------------------------------------------------------------------------------- |
| accent    | string | `"#FF620C"` | Seek bar, volume control and for highlighting interactions.                              |
| base      | string | `"#000000"` | Player controls bar, information bar, central play button, and right-click context menu. |
| text      | string | `"#FFFFFF"` | All the text and icons that are present within the video player UI.                      |

Learn more about the color scheme options and how they're used [on the Cloudinary docs](https://cloudinary.com/documentation/video_player_customization#color_scheme).

## Event Props

The event props allow you to pass in a function that is called whenever the associated event occurs.

For instance, in order to trigger an event whenever a video is paused:

```html
<CldVideoPlayer
  :onPause="({ player }) => console.log(`current time: ${player.currentTime()}`)"
/>
```

## Logo Prop

The `logo` prop gives the option to customize the player's logo.

`logo` defaults to `true`, showing the Cloudinary logo and linking to https://cloudinary.com when clicked.

When `logo` is set to `false`, no logo will be displayed.

To customize the logo, the following options are available in the form of an object:

| Prop Name  | Type   | Default | Description                     |
| ---------- | ------ | ------- | ------------------------------- |
| imageUrl   | string | -       | Image URL for player logo.      |
| onClickUrl | string | -       | URL to browse to on logo click. |

## Ref Props

The `playerRef` and `videoRef` props give you the ability to pass in your own ref to gain access to both the Player instance as well as the HTML video element on which the player is mounted.

To do this, create a new Ref instance and pass as ref to the `CldVideoPlayer` component:

```vue
<script setup lang="ts">
const cldVideoPlayerRef = ref();

console.log(cldVideoPlayerRef)
// will output { playerRef, videoRef }
</script>

<template>
  <CldVideoPlayer ref="cldVideoPlayerRef" ... />
</template>
```
