<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "@unhead/vue";
import { parseUrl } from "@cloudinary-util/util";
import {
  getVideoPlayerOptions,
  type ConfigOptions,
  type GetVideoPlayerOptions,
} from "@cloudinary-util/url-loader";
import { useRuntimeConfig } from "#imports";

export interface CloudinaryVideoPlayer {
  // eslint-disable-next-line @typescript-eslint/ban-types
  on: Function;
}

export interface CloudinaryVideoPlayerOptions {
  autoPlay?: boolean;
  autoplayMode?: "never" | "always" | "on-scroll";
  playsinline?: boolean;
  cloud_name?: string;
  colors?: CloudinaryVideoPlayerOptionsColors;
  controls?: boolean;
  fontFace?: string;
  loop?: boolean;
  muted?: boolean;
  publicId: string;
  secure?: boolean;
  transformation?: Array<object> | object;
  hideContextMenu?: boolean;
  config?: ConfigOptions;
  pictureInPictureToggle?: boolean;
  chapters?: Record<string | number, string> | boolean;
  chaptersButton?: boolean;
  disableRemotePlayback?: boolean;
}

export interface CloudinaryVideoPlayerOptionsColors {
  accent?: string;
  base?: string;
  text?: string;
}

export interface CloudinaryVideoPlayerOptionsLogo {
  logoImageUrl?: string;
  logoOnclickUrl?: string;
  showLogo?: boolean;
}

export interface CldVideoPlayerPropsLogo {
  imageUrl?: CloudinaryVideoPlayerOptionsLogo["logoImageUrl"];
  logo?: boolean;
  onClickUrl?: CloudinaryVideoPlayerOptionsLogo["logoOnclickUrl"];
}

export type CldVideoPlayerProps = Pick<
  CloudinaryVideoPlayerOptions,
  | "colors"
  | "controls"
  | "fontFace"
  | "loop"
  | "muted"
  | "transformation"
  | "hideContextMenu"
> & {
  autoPlay?: boolean;
  autoplayMode?: "never" | "always" | "on-scroll";
  playsinline?: boolean;
  className?: string;
  height: string | number;
  id?: string;
  logo?: boolean | CldVideoPlayerPropsLogo;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onDataLoad?: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onMetadataLoad?: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onPause?: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onPlay?: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onEnded?: Function;
  playerRef?: { value: CloudinaryVideoPlayer | null };
  src: string;
  version?: string;
  videoRef?: { value: HTMLVideoElement | null };
  quality?: string | number;
  width: string | number;
  config?: ConfigOptions;
  pictureInPictureToggle?: boolean;
  chapters?: Record<string | number, string> | boolean;
  chaptersButton?: boolean;
  disableRemotePlayback?: boolean;
};

const props = withDefaults(defineProps<CldVideoPlayerProps>(), {
  autoPlay: false,
  autoplayMode: "always",
  playsinline: false,
  controls: true,
  logo: true,
  loop: false,
  muted: false,
  version: "1.11.1",
  quality: "auto",
});

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
} = props as CldVideoPlayerProps;

const playerTransformations = Array.isArray(transformation)
  ? transformation
  : [transformation];

let publicId = src;

// If the publicId/src is a URL, attempt to parse it as a Cloudinary URL
// to get the public ID alone

if (publicId.startsWith("http")) {
  try {
    const parts = parseUrl(src);
    if (typeof parts?.publicId === "string") {
      publicId = parts?.publicId;
    }
  } catch (e) {
    console.error(e);
  }
}

playerTransformations.unshift({
  quality,
});

const cloudinaryRef = ref<any>();
const defaultVideoRef = ref();
const videoRef = props.videoRef || defaultVideoRef;
const defaultPlayerRef = ref();
const playerRef = props.playerRef || defaultPlayerRef;

const playerId = id || `player-${publicId.replace("/", "-")}`;
let playerClassName = "cld-video-player cld-fluid";

if (className) {
  playerClassName = `${playerClassName} ${className}`;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const events: Record<string, Function | undefined> = {
  error: onError,
  loadeddata: onDataLoad,
  loadedmetadata: onMetadataLoad,
  pause: onPause,
  play: onPlay,
  ended: onEnded,
};
function handleEvent(event: { type: "string" }) {
  const activeEvent = events[event.type];

  if (typeof activeEvent === "function") {
    activeEvent({
      player: playerRef.value,
      video: videoRef.value,
    });
  }
}

const handleOnLoad = () => {
  if ("cloudinary" in window) {
    cloudinaryRef.value = window.cloudinary;

    const playerOptions = getVideoPlayerOptions(
      {
        ...props,
        colors: props.colors || {},
        fontFace: props.fontFace || "",
      } as GetVideoPlayerOptions,
      {
        cloud: {
          cloudName: useRuntimeConfig().public.cloudinary.cloudName,
        },
        ...useRuntimeConfig().public.cloudinary.cloud,
        ...useRuntimeConfig().public.cloudinary.url,
        ...config,
      }
    );

    playerRef.value = cloudinaryRef.value.videoPlayer(
      videoRef.value,
      playerOptions
    );

    Object.keys(events).forEach((key) => {
      if (typeof events[key] === "function") {
        playerRef.value?.on(key, handleEvent);
      }
    });
  }
};

defineExpose({
  playerRef,
  videoRef,
});

useHead({
  script: [
    {
      id: `cloudinary-videoplayer-${playerId}`,
      src: `https://unpkg.com/cloudinary-video-player@${version}/dist/cld-video-player.min.js`,
      onload: handleOnLoad,
      onerror: (e) =>
        console.error(
          `Failed to load Cloudinary Video Player: ${(e as any).message}`
        ),
    },
  ],
  link: [
    {
      href: `https://unpkg.com/cloudinary-video-player@${
        version || "1.11.1"
      }/dist/cld-video-player.min.css`,
      rel: "stylesheet",
    },
  ],
});
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
