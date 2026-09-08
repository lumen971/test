<script setup lang="ts">
import type { ArticleBlock, RichTextSpan } from '../../shared/types/content'
defineProps<{ blocks: ArticleBlock[] }>()

const text = (spans?: RichTextSpan[]) => spans?.map(span => span.text).join('') || ''
const headingId = (block: ArticleBlock) => `section-${block.id.replace(/[^a-zA-Z0-9_-]/g, '')}`

const youtubeEmbedUrl = (url?: string) => {
  if (!url) return undefined

  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname.replace(/^www\./, '')
    let videoId = ''

    if (hostname === 'youtu.be') videoId = parsed.pathname.split('/').filter(Boolean)[0] || ''
    if (hostname === 'youtube.com' || hostname === 'm.youtube.com' || hostname === 'music.youtube.com') {
      if (parsed.pathname === '/watch') videoId = parsed.searchParams.get('v') || ''
      else if (/^\/(embed|shorts|live)\//.test(parsed.pathname)) videoId = parsed.pathname.split('/')[2] || ''
    }

    return /^[a-zA-Z0-9_-]{6,}$/.test(videoId)
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : undefined
  } catch {
    return undefined
  }
}
</script>

<template>
  <div class="notion-content">
    <template v-for="block in blocks" :key="block.id">
      <h2 v-if="block.type === 'heading_1'" :id="headingId(block)">{{ text(block.richText) }}</h2>
      <h3 v-else-if="block.type === 'heading_2'" :id="headingId(block)">{{ text(block.richText) }}</h3>
      <h4 v-else-if="block.type === 'heading_3'" :id="headingId(block)">{{ text(block.richText) }}</h4>
      <p v-else-if="block.type === 'paragraph'">
        <template v-for="(span, index) in block.richText" :key="index">
          <a v-if="span.href" :href="span.href" target="_blank" rel="noopener" :class="{ bold: span.bold, italic: span.italic, code: span.code }">{{ span.text }}</a>
          <span v-else :class="{ bold: span.bold, italic: span.italic, code: span.code }">{{ span.text }}</span>
        </template>
      </p>
      <blockquote v-else-if="block.type === 'quote'">{{ text(block.richText) }}</blockquote>
      <ul v-else-if="block.type === 'bulleted_list_item'"><li>{{ text(block.richText) }}</li></ul>
      <ol v-else-if="block.type === 'numbered_list_item'"><li>{{ text(block.richText) }}</li></ol>
      <label v-else-if="block.type === 'to_do'" class="notion-todo"><input type="checkbox" disabled :checked="block.checked"> {{ text(block.richText) }}</label>
      <pre v-else-if="block.type === 'code'"><code>{{ text(block.richText) }}</code></pre>
      <hr v-else-if="block.type === 'divider'">
      <figure v-else-if="block.type === 'image' && block.url"><img :src="block.url" :alt="block.caption || ''"><figcaption v-if="block.caption">{{ block.caption }}</figcaption></figure>
      <figure v-else-if="['video', 'embed'].includes(block.type) && youtubeEmbedUrl(block.url)" class="notion-video">
        <div class="notion-video-frame">
          <iframe
            :src="youtubeEmbedUrl(block.url)"
            :title="block.caption || 'YouTube 影片播放器'"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        </div>
        <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
      </figure>
      <figure v-else-if="block.type === 'video' && block.url" class="notion-video">
        <video :src="block.url" controls preload="metadata" playsinline />
        <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
      </figure>
      <NotionContent v-if="block.children?.length" :blocks="block.children" />
    </template>
  </div>
</template>

<style scoped>
.notion-video {
  margin: clamp(1.75rem, 4vw, 3rem) 0;
}

.notion-video-frame {
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 1px solid color-mix(in srgb, #d6b875 55%, transparent);
  border-radius: 1rem;
  background: #0b1020;
  box-shadow: 0 1.25rem 3rem rgb(12 18 38 / 24%);
}

.notion-video-frame iframe,
.notion-video video {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.notion-video video {
  max-height: 75vh;
  border-radius: 1rem;
  background: #0b1020;
}

.notion-video figcaption {
  margin-top: 0.75rem;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.72;
}
</style>
