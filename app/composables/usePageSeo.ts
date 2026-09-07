interface PageSeoOptions {
  title?: string
  socialTitle?: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  robots?: string
  schemaType?: 'WebPage' | 'ProfilePage' | 'CollectionPage'
}

export function usePageSeo(options: PageSeoOptions) {
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl || 'https://witchlumen.com').replace(/\/$/, '')
  const canonicalUrl = `${siteUrl}${options.path === '/' ? '' : options.path}`
  const imageUrl = options.image?.startsWith('http')
    ? options.image
    : `${siteUrl}${options.image || '/og.png'}`
  const socialTitle = options.socialTitle || (options.title ? `${options.title}｜花火流明` : '花火流明｜靈性工作者與 VTuber')

  useSeoMeta({
    title: options.title,
    description: options.description,
    robots: options.robots || 'index, follow',
    author: '花火流明',
    ogType: 'website',
    ogSiteName: '花火流明',
    ogLocale: 'zh_TW',
    ogTitle: socialTitle,
    ogDescription: options.description,
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    ogImageAlt: options.imageAlt || '花火流明｜靈性工作者與 VTuber',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterTitle: socialTitle,
    twitterDescription: options.description,
    twitterImage: imageUrl,
    twitterImageAlt: options.imageAlt || '花火流明｜靈性工作者與 VTuber'
  })

  const webpage = {
    '@type': options.schemaType || 'WebPage',
    '@id': `${canonicalUrl}/#webpage`,
    url: canonicalUrl,
    name: socialTitle,
    description: options.description,
    inLanguage: 'zh-Hant-TW',
    isPartOf: { '@id': `${siteUrl}/#website` },
    ...(options.schemaType === 'ProfilePage' ? { mainEntity: { '@id': `${siteUrl}/#person` } } : {})
  }
  const breadcrumbs = options.path === '/' ? [] : [{
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}/#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首頁', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: options.title || socialTitle, item: canonicalUrl }
    ]
  }]

  useHead({
    link: [{ key: 'canonical', rel: 'canonical', href: canonicalUrl }],
    script: [{
      key: `page-jsonld-${options.path}`,
      type: 'application/ld+json',
      innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': [webpage, ...breadcrumbs] }).replace(/</g, '\\u003c')
    }]
  })
}
