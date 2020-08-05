import theme from '@nuxt/content-theme-docs'

export default theme({
  loading: { color: '#fff' },
  head: {
    link: [{ rel: 'icon', type: 'image/png', href: 'https://res.cloudinary.com/cloudinary/image/upload/c_scale,w_200/v1/logo/for_white_bg/cloudinary_icon_for_white_bg.png' }]
  },
  generate: {
    fallback: '404.html', // for Netlify
    routes: ['/'] // give the first url to start crawling
  },
  i18n: {
    defaultLocale: 'en'
  }
})
