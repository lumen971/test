<script setup lang="ts">
import type { ArticleBlock, ArticleDetail } from '../../../shared/types/content'

const route = useRoute()
const config = useRuntimeConfig()
const { data: article } = await useFetch<ArticleDetail>(`/api/articles/${route.params.slug}`)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: '找不到這篇文章' })
}

const siteUrl = String(config.public.siteUrl || 'https://witchlumen.com').replace(/\/$/, '')
const canonicalUrl = computed(() => `${siteUrl}/articles/${article.value?.slug}`)
const shareImage = computed(() => article.value?.cover || `${siteUrl}/og.png`)
const articleTitle = computed(() => article.value?.seoTitle || article.value?.title || '靈感札記')
const articleDescription = computed(() => article.value?.seoDescription || article.value?.excerpt || '')
const socialArticleTitle = computed(() => `${articleTitle.value}｜花火流明`)
const articleBody = ref<HTMLElement | null>(null)
const readingProgress = ref(0)

const articlePlainText = computed(() => {
  const collectText = (blocks: ArticleDetail['blocks']): string => blocks
    .map(block => [
      block.richText?.map(span => span.text).join('') || '',
      block.children?.length ? collectText(block.children) : ''
    ].join(' '))
    .join(' ')

  return `${article.value?.title || ''} ${article.value?.excerpt || ''} ${collectText(article.value?.blocks || [])}`
})

const readingMinutes = computed(() => {
  const content = articlePlainText.value
  const chineseCharacters = (content.match(/[\u3400-\u9fff]/g) || []).length
  const latinWords = content
    .replace(/[\u3400-\u9fff]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(chineseCharacters / 400 + latinWords / 200))
})

interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

const tableOfContents = computed<TableOfContentsItem[]>(() => {
  const items: TableOfContentsItem[] = []

  const collectHeadings = (blocks: ArticleBlock[]) => {
    for (const block of blocks) {
      if (['heading_1', 'heading_2', 'heading_3'].includes(block.type)) {
        const title = block.richText?.map(span => span.text).join('').trim() || ''
        if (title) {
          items.push({
            id: `section-${block.id.replace(/[^a-zA-Z0-9_-]/g, '')}`,
            title,
            level: Number(block.type.slice(-1))
          })
        }
      }

      if (block.children?.length) collectHeadings(block.children)
    }
  }

  collectHeadings(article.value?.blocks || [])
  return items.length >= 3 ? items : []
})

const updateReadingProgress = () => {
  if (!articleBody.value) return

  const start = articleBody.value.offsetTop
  const distance = Math.max(articleBody.value.offsetHeight - window.innerHeight * .45, 1)
  readingProgress.value = Math.min(100, Math.max(0, ((window.scrollY - start) / distance) * 100))
}

onMounted(() => {
  updateReadingProgress()
  window.addEventListener('scroll', updateReadingProgress, { passive: true })
  window.addEventListener('resize', updateReadingProgress)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateReadingProgress)
  window.removeEventListener('resize', updateReadingProgress)
})

useSeoMeta({
  title: () => articleTitle.value,
  description: () => articleDescription.value,
  author: '花火流明',
  ogType: 'article',
  ogSiteName: '花火流明',
  ogLocale: 'zh_TW',
  ogTitle: () => socialArticleTitle.value,
  ogDescription: () => articleDescription.value,
  ogUrl: () => canonicalUrl.value,
  ogImage: () => shareImage.value,
  ogImageAlt: () => `${article.value?.title || '花火流明'}文章封面`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  articlePublishedTime: () => article.value?.publishedAtIso,
  articleModifiedTime: () => article.value?.updatedAt,
  articleSection: () => article.value?.category,
  twitterCard: 'summary_large_image',
  twitterTitle: () => socialArticleTitle.value,
  twitterDescription: () => articleDescription.value,
  twitterImage: () => shareImage.value,
  twitterImageAlt: () => `${article.value?.title || '花火流明'}文章封面`,
  robots: () => article.value?.noIndex ? 'noindex, nofollow' : 'index, follow'
})

useHead(() => ({
  link: [{ key: 'canonical', rel: 'canonical', href: canonicalUrl.value }],
  script: [{
    key: 'article-jsonld',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl.value}/#webpage`,
          url: canonicalUrl.value,
          name: socialArticleTitle.value,
          description: articleDescription.value,
          inLanguage: 'zh-Hant-TW',
          isPartOf: { '@id': `${siteUrl}/#website` },
          breadcrumb: { '@id': `${canonicalUrl.value}/#breadcrumb` },
          mainEntity: { '@id': `${canonicalUrl.value}/#article` }
        },
        {
          '@type': 'BlogPosting',
          '@id': `${canonicalUrl.value}/#article`,
          headline: article.value?.title,
          description: articleDescription.value,
          image: [shareImage.value],
          datePublished: article.value?.publishedAtIso,
          dateModified: article.value?.updatedAt || article.value?.publishedAtIso,
          articleSection: article.value?.category,
          inLanguage: 'zh-Hant-TW',
          mainEntityOfPage: { '@id': `${canonicalUrl.value}/#webpage` },
          isPartOf: { '@id': `${siteUrl}/#website` },
          author: { '@id': `${siteUrl}/#person` }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl.value}/#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: '首頁', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: '靈感札記', item: `${siteUrl}/articles` },
            { '@type': 'ListItem', position: 3, name: article.value?.title, item: canonicalUrl.value }
          ]
        }
      ]
    }).replace(/</g, '\\u003c')
  }]
}))
</script>

<template>
  <article v-if="article" class="article-page article-detail-page">
    <div class="reading-progress" aria-hidden="true">
      <span :style="{ transform: `scaleX(${readingProgress / 100})` }" />
    </div>

    <figure v-if="article.cover" class="article-hero-cover">
      <img :src="article.cover" :alt="`${article.title}文章封面`" decoding="async">
    </figure>

    <div ref="articleBody" class="article-body">
      <p class="eyebrow article-meta">
        <span>{{ article.category }}</span>
        <span aria-hidden="true">·</span>
        <time :datetime="article.publishedAtIso">{{ article.publishedAt }}</time>
        <span aria-hidden="true">·</span>
        <span>約 {{ readingMinutes }} 分鐘閱讀</span>
      </p>
      <h1>{{ article.title }}</h1>
      <p class="article-intro">{{ article.excerpt }}</p>
      <nav v-if="tableOfContents.length" class="article-toc" aria-labelledby="article-toc-title">
        <p class="article-toc-eyebrow">IN THIS ARTICLE</p>
        <h2 id="article-toc-title">本文目錄</h2>
        <ol>
          <li v-for="item in tableOfContents" :key="item.id" :class="`toc-level-${item.level}`">
            <a :href="`#${item.id}`">{{ item.title }}</a>
          </li>
        </ol>
      </nav>
      <NotionContent v-if="article.blocks.length" class="prose" :blocks="article.blocks" />
      <div v-else class="prose"><p>這篇文章目前尚無內文。</p></div>
    </div>

    <aside v-if="article.relatedArticles?.length" class="related-articles" aria-labelledby="related-articles-title">
      <p class="eyebrow">CONTINUE READING</p>
      <h2 id="related-articles-title">延伸閱讀</h2>
      <div class="article-grid related-article-grid">
        <NuxtLink
          v-for="related in article.relatedArticles"
          :key="related.id"
          class="article-card article-card-link"
          :to="`/articles/${related.slug}`"
          :aria-label="`閱讀文章：${related.title}`"
        >
          <ArticleCover :article="related" />
          <div>
            <time>{{ related.publishedAt }}</time>
            <h3>{{ related.title }}</h3>
            <p>{{ related.excerpt }}</p>
            <span class="article-read-more" aria-hidden="true">繼續閱讀 →</span>
          </div>
        </NuxtLink>
      </div>
    </aside>
  </article>
</template>
