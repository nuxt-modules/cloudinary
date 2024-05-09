<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "@unhead/vue";
import { useRuntimeConfig } from "#imports";
import { parseUrl } from "@cloudinary-util/util";
import { type ConfigOptions } from "@cloudinary-util/url-loader";

export interface CloudinaryVideoPlayer {
  on: Function;
}

export interface CloudinaryVideoPlayerOptions {
  autoplayMode?: string;
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
  autoPlay?: string;
  className?: string;
  height: string | number;
  id?: string;
  logo?: boolean | CldVideoPlayerPropsLogo;
  onDataLoad?: Function;
  onError?: Function;
  onMetadataLoad?: Function;
  onPause?: Function;
  onPlay?: Function;
  onEnded?: Function;
  playerRef?: { value: CloudinaryVideoPlayer | null };
  src: string;
  version?: string;
  videoRef?: { value: HTMLVideoElement | null };
  quality?: string | number;
  width: string | number;
  config?: ConfigOptions;
  pictureInPictureToggle?: boolean;
};

const props = withDefaults(defineProps<CldVideoPlayerProps>(), {
  autoPlay: "never",
  controls: true,
  logo: true,
  loop: false,
  muted: false,
  version: "1.10.6",
  quality: "auto",
});

const idRef = ref(Math.ceil(Math.random() * 100000));

const {
  autoPlay,
  className,
  colors,
  controls,
  fontFace,
  height,
  id,
  logo,
  loop,
  muted,
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
  hideContextMenu,
  config,
  pictureInPictureToggle,
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

const playerId = id || `player-${publicId.replace("/", "-")}-${idRef.value}`;
let playerClassName = "cld-video-player cld-fluid";

if (className) {
  playerClassName = `${playerClassName} ${className}`;
}

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

    let logoOptions: CloudinaryVideoPlayerOptionsLogo = {};

    if (typeof logo === "boolean") {
      logoOptions.showLogo = logo;
    } else if (typeof logo === "object") {
      logoOptions = {
        ...logoOptions,
        showLogo: true,
        logoImageUrl: logo.imageUrl,
        logoOnclickUrl: logo.onClickUrl,
      };
    }

    const playerOptions: CloudinaryVideoPlayerOptions = {
      autoplayMode: autoPlay,
      cloud_name: useRuntimeConfig().public.cloudinary.cloudName,
      controls,
      fontFace: fontFace || "",
      loop,
      muted,
      publicId,
      secure: true,
      width,
      height,
      aspectRatio: `${width}:${height}`,
      transformation: playerTransformations,
      ...logoOptions,
      hideContextMenu,
      pictureInPictureToggle,
      ...useRuntimeConfig().public.cloudinary.cloud,
      ...useRuntimeConfig().public.cloudinary.url,
      ...config,
    };

    if (typeof colors === "object") {
      playerOptions.colors = colors;
    }

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
      id: `cloudinary-videoplayer-${Math.floor(Math.random() * 100)}`,
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
        version || "1.10.6"
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
    />
  </div>
</template>
