<template>
  <CldVideoPlayer
    width="1620"
    height="1080"
    src="videos/mountain-stars"
    font-face="Source Serif Pro"
    :on-pause="({ player }) => console.log(`current time: ${player.currentTime()}`)"
  />
</template>
