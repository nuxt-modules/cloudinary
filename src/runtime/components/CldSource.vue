
  <script>
  export default {
    props: {
      srcset: String,
      media: String,
    },
  };
  </script>

<template>
    <source :srcset="srcset" :media="media" />
  </template>
  
  