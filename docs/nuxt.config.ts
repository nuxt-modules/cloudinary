export default defineNuxtConfig({
  extends: '@nuxt/ui-pro',

  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxtjs/cloudinary',
  ],

  colorMode: {
    preference: 'dark',
  },

  cloudinary: {
    cloudName: 'nuxt-cloudinary',
  },

  ui: {
    icons: ['heroicons', 'simple-icons', 'ph'],
  },

  nitro: {
    prerender: {
      routes: ['/api/search.json'],
    },
  },

  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    // Adding all global components to the main entry
    // To avoid lagging during page navigation on client-side
    'components:extend': function (components) {
      for (const comp of components) {
        if (comp.global)
          comp.global = 'sync'
      }
    },
  },

  // devtools: {
  //   enabled: true,
  //   componentInspector: {
  //     cleanHtml: false,
  //   },
  // },
})
