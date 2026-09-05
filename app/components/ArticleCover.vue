<script setup lang="ts">
import type { ArticleSummary } from '../../shared/types/content'

defineProps<{ article: ArticleSummary }>()
const coverFailed = ref(false)
</script>

<template>
  <div class="article-cover">
    <img
      v-if="article.cover && !coverFailed"
      :src="article.cover"
      :alt="`${article.title}文章封面`"
      loading="lazy"
      decoding="async"
      referrerpolicy="no-referrer"
      @error="coverFailed = true"
    >
    <span>{{ article.category }}</span>
  </div>
</template>
