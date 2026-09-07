<script setup lang="ts">
import type { ArticleSummary } from '../../../shared/types/content'

useSeoMeta({
  title: '靈感札記',
  description: '花火流明關於能量、覺察與靈性生活的文章。'
})

const { data: articles } = await useFetch<ArticleSummary[]>('/api/articles')
</script>

<template>
  <div class="page-wrap">
    <SectionHeading
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
