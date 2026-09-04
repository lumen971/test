export default defineNuxtConfig({
  compatibilityDate: '2026-07-15',
  devtools: { enabled: true },
  nitro: { preset: 'vercel' },
  css: ['~/assets/css/main.css', '~/assets/css/brand-assets.css', '~/assets/css/hero-background.css', '~/assets/css/about-page.css', '~/assets/css/notion-content.css'],
  runtimeConfig: {
    notionToken: '',
    notionArticlesDataSourceId: '',
    notionSupportersDataSourceId: '',
    revalidateSecret: '',
    public: { siteUrl: 'https://witchlumen.com' }
  },
  routeRules: {
    '/': { isr: 600 },
    '/articles/**': { isr: 300 },
    '/supporters/**': { isr: 300 },
    '/api/**': { cors: false }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hant-TW' },
      meta: [{ name: 'theme-color', content: '#16283b' }],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600&family=Noto+Serif+TC:wght@500;600;700&display=swap' }
      ]
    }
  }
})
