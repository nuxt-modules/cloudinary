# CldVideoPlayer.vue

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

::alert{type="info"}
Check the browser console after playing and pausing the video for logs that were added to the component.
::

:video-player-with-events
