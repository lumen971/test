<script setup lang="ts">
import type { ArticleDetail } from '../../../shared/types/content'

const route = useRoute()
const config = useRuntimeConfig()
const { data: article } = await useFetch<ArticleDetail>(`/api/articles/${route.params.slug}`)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: '找不到這篇文章' })
}

const siteUrl = String(config.public.siteUrl || 'https://witchlumen.com').replace(/\/$/, '')
const canonicalUrl = computed(() => `${siteUrl}/articles/${article.value?.slug}`)
const shareImage = computed(() => article.value?.cover || `${siteUrl}/images/hero-luminous-lotus.jpg`)
const articleTitle = computed(() => article.value?.seoTitle || article.value?.title || '靈感札記')
const articleDescription = computed(() => article.value?.seoDescription || article.value?.excerpt || '')

useSeoMeta({
  title: () => articleTitle.value,
  description: () => articleDescription.value,
  ogType: 'article',
  ogTitle: () => articleTitle.value,
  ogDescription: () => articleDescription.value,
  ogUrl: () => canonicalUrl.value,
  ogImage: () => shareImage.value,
  ogImageAlt: () => `${article.value?.title || '花火流明'}文章封面`,
  articlePublishedTime: () => article.value?.publishedAtIso,
  articleModifiedTime: () => article.value?.updatedAt,
  articleSection: () => article.value?.category,
  twitterCard: 'summary_large_image',
  twitterTitle: () => articleTitle.value,
  twitterDescription: () => articleDescription.value,
  twitterImage: () => shareImage.value,
  robots: () => article.value?.noIndex ? 'noindex, nofollow' : 'index, follow'
})

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.value?.title,
      description: articleDescription.value,
      image: [shareImage.value],
      datePublished: article.value?.publishedAtIso,
      dateModified: article.value?.updatedAt || article.value?.publishedAtIso,
      inLanguage: 'zh-Hant-TW',
      mainEntityOfPage: canonicalUrl.value,
      author: { '@type': 'Person', name: '花火流明', url: `${siteUrl}/about` },
      publisher: { '@type': 'Person', name: '花火流明', url: siteUrl }
    }).replace(/</g, '\\u003c')
  }]
}))
</script>

<template>
  <article v-if="article" class="article-page">
    <NuxtLink class="article-back" to="/articles">← 返回靈感札記</NuxtLink>
    <figure v-if="article.cover" class="article-hero-cover">
      <img :src="article.cover" :alt="`${article.title}文章封面`" decoding="async">
    </figure>
    <p class="eyebrow">{{ article.category }} · <time :datetime="article.publishedAtIso">{{ article.publishedAt }}</time></p>
    <h1>{{ article.title }}</h1>
    <p class="article-intro">{{ article.excerpt }}</p>
    <NotionContent v-if="article.blocks.length" class="prose" :blocks="article.blocks" />
    <div v-else class="prose"><p>這篇文章目前尚無內文。</p></div>
  </article>
</template>
