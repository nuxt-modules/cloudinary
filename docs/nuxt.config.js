import theme from '@nuxt/content-theme-docs'

export default theme({
  loading: { color: '#fff' },
  generate: {
    fallback: '404.html', // for Netlify
    routes: ['/'] // give the first url to start crawling
  },
  i18n: {
    defaultLocale: 'en'
  }
})
