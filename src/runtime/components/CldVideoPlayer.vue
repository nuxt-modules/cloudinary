<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { parseUrl } from '@cloudinary-util/util'
import {
  getVideoPlayerOptions,
  type ConfigOptions,
  type GetVideoPlayerOptions,
} from '@cloudinary-util/url-loader'
import { useRuntimeConfig } from '#imports'

type HandleEventFunction = (event: {
  player: CldVideoPlayerProps['videoRef']
  video: CldVideoPlayerProps['videoRef']
}) => object

type CallbackFunction = (
  key: string,
  handleEvent: HandleEventFunction
) => object

export interface CloudinaryVideoPlayer {
  on: CallbackFunction
}

export interface CloudinaryVideoPlayerOptionsColors {
  accent?: string
  base?: string
  text?: string
}

export type CldVideoPlayerProps = GetVideoPlayerOptions & {
  autoPlay?: boolean
  autoplayMode?: 'never' | 'always' | 'on-scroll'
  className?: string
  colors?: CloudinaryVideoPlayerOptionsColors
  height: string | number
  id?: string
  onDataLoad?: HandleEventFunction
  onError?: HandleEventFunction
  onMetadataLoad?: HandleEventFunction
  onPause?: HandleEventFunction
  onPlay?: HandleEventFunction
  onEnded?: HandleEventFunction
  playerRef?: { value: CloudinaryVideoPlayer | null }
  version?: string
  videoRef?: { value: HTMLVideoElement | null }
  width: string | number
  config?: ConfigOptions
  pictureInPictureToggle?: boolean
  chapters?: Record<string | number, string> | boolean
  chaptersButton?: boolean
  disableRemotePlayback?: boolean
}

const props = withDefaults(defineProps<CldVideoPlayerProps>(), {
  autoPlay: false,
  autoplayMode: 'always',
  playsinline: false,
  controls: true,
  logo: true,
  loop: false,
  muted: false,
  version: '1.11.1',
  quality: 'auto',
})

const {
  className,
  height,
  id,
  onDataLoad,
  onError,
  onMetadataLoad,
  onPause,
  onPlay,
  onEnded,
  src,
  transformation,
  version,
  quality,
  width,
  config,
} = props

const playerTransformations = Array.isArray(transformation)
  ? transformation
  : [transformation]

let localPublicId = src

// If the publicId/src is a URL, attempt to parse it as a Cloudinary URL
// to get the public ID alone

if (localPublicId.startsWith('http')) {
  try {
    const parts = parseUrl(src)
    if (typeof parts?.publicId === 'string') {
      localPublicId = parts?.publicId
    }
  }
  catch (e) {
    console.error(e)
  }
}

playerTransformations.unshift({
  quality,
})

const cloudinaryRef = ref<any>()
const defaultVideoRef = ref()
const videoRef = props.videoRef || defaultVideoRef
const defaultPlayerRef = ref()
const playerRef = props.playerRef || defaultPlayerRef

const playerId = id || `player-${localPublicId.replace('/', '-')}`
let playerClassName = 'cld-video-player cld-fluid'

if (className) {
  playerClassName = `${playerClassName} ${className}`
}

const events: Record<string, HandleEventFunction | undefined> = {
  error: onError,
  loadeddata: onDataLoad,
  loadedmetadata: onMetadataLoad,
  pause: onPause,
  play: onPlay,
  ended: onEnded,
}
function handleEvent(event: { type: 'string' }) {
  const activeEvent = events[event.type]

  if (typeof activeEvent === 'function') {
    activeEvent({
      player: playerRef.value,
      video: videoRef.value,
    })
  }
}

const handleOnLoad = () => {
  if ('cloudinary' in window) {
    cloudinaryRef.value = window.cloudinary

    const playerOptions = getVideoPlayerOptions(
      {
        ...props,
        colors: props.colors || {},
        fontFace: props.fontFace || '',
        publicId: localPublicId,
        playedEventPercents: props.playedEventPercents || [25, 50, 75, 100],
        playedEventTimes: props.playedEventTimes || [],
      } as GetVideoPlayerOptions,
      {
        cloud: {
          cloudName: useRuntimeConfig().public.cloudinary.cloudName,
        },
        ...useRuntimeConfig().public.cloudinary.cloud,
        ...useRuntimeConfig().public.cloudinary.url,
        ...config,
      },
    )

    playerRef.value = cloudinaryRef.value.videoPlayer(
      videoRef.value,
      JSON.parse(JSON.stringify(playerOptions)),
    )

    Object.keys(events).forEach((key) => {
      if (typeof events[key] === 'function') {
        playerRef.value?.on(key, handleEvent)
      }
    })
  }
}

defineExpose({
  playerRef,
  videoRef,
})

useHead({
  script: [
    {
      id: `cloudinary-videoplayer-${playerId}`,
      src: `https://unpkg.com/cloudinary-video-player@${version}/dist/cld-video-player.min.js`,
      onload: handleOnLoad,
      onerror: e =>
        console.error(
          `Failed to load Cloudinary Video Player: ${(e as any).message}`,
        ),
    },
  ],
  link: [
    {
      href: `https://unpkg.com/cloudinary-video-player@${
        version || '1.11.1'
      }/dist/cld-video-player.min.css`,
      rel: 'stylesheet',
    },
  ],
})
</script>

<template>
  <div :style="{ width: '100%', aspectRatio: `${width} / ${height}` }">
    <video
      :id="playerId"
      ref="videoRef"
      :class="playerClassName"
      :width="width"
      :height="height"
      :disableRemotePlayback="disableRemotePlayback"
    />
  </div>
</template>
