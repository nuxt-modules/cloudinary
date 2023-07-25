<template>
  <CldVideoPlayer
    width="1620"
    height="1080"
    src="videos/mountain-stars"
    fontFace="Source Serif Pro"
    :onPause="({ player }) => console.log(`current time: ${player.currentTime()}`)"
  />
</template>
