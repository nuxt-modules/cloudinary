# CldVideoPlayer.vue

---

## The usage

The CldVideoPlayer component helps to embed Cloudinary videos using the [Cloudinary Video Player](https://cloudinary.com/documentation/cloudinary_video_player) giving you a full customizable experience for your player.

## Basic Usage

The basic required props include `width`, `height`, and `src`:

```jsx
<CldVideoPlayer
  width="1920"
  height="1080"
  src="<Public ID>"
/>
```

<CldVideoPlayer
  width="1620"
  height="1080"
  src="videos/mountain-stars"
/>

## Customization

You can further take advantage of features like customizing your player:

```jsx
<CldVideoPlayer
  width="1620"
  height="1080"
  src="<Public ID>"
  colors={{
    accent: '#ff0000',
    base: '#00ff00',
    text: '#0000ff'
  }}
  fontFace="Source Serif Pro"
/>
```

<CldVideoPlayer
  width="1620"
  height="1080"
  src="videos/mountain-stars"
  colors={{
    accent: '#ff0000',
    base: '#00ff00',
    text: '#0000ff'
  }}
  fontFace="Source Serif Pro"
/>

## Player Events

Or listening to player events for advanced interactions with:

```jsx
<CldVideoPlayer
  width="600"
  height="600"
  src="<Cloudinary URL>"
  onMetadataLoad={({ player }) => {
    console.log(`duration: ${player.duration()}`);
  }}
  onPause={({ player }) => {
    console.log(`current time: ${player.currentTime()}`);
  }}
/>
```
