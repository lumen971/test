<script setup lang="ts">
import type { ArticleSummary } from '../../../shared/types/content'

usePageSeo({
  title: '靈感札記',
  description: '閱讀花火流明關於能量狀態、內在覺察、靈性實踐與生活整理的文章。',
  path: '/articles',
  imageAlt: '花火流明靈感札記',
  schemaType: 'CollectionPage'
})

const { data: articles } = await useFetch<ArticleSummary[]>('/api/articles')
</script>

<template>
  <div class="page-wrap">
    <SectionHeading
      as="h1"
      eyebrow="LUMEN JOURNAL"
      title="靈感札記"
      description="在日常裡練習覺察，在文字裡收藏光。新的書寫將持續在此與你相遇。"
    />

    <div class="article-grid">
      <NuxtLink
        v-for="article in articles"
        :key="article.id"
        class="article-card article-card-link"
        :to="`/articles/${article.slug}`"
        :aria-label="`閱讀文章：${article.title}`"
      >
        <ArticleCover :article="article" />
        <div>
          <time>{{ article.publishedAt }}</time>
          <h2>{{ article.title }}</h2>
          <p>{{ article.excerpt }}</p>
          <span class="article-read-more" aria-hidden="true">繼續閱讀 →</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
