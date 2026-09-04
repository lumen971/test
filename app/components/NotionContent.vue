<script setup lang="ts">
import type { ArticleBlock, RichTextSpan } from '../../shared/types/content'
defineProps<{ blocks: ArticleBlock[] }>()

const text = (spans?: RichTextSpan[]) => spans?.map(span => span.text).join('') || ''
</script>

<template>
  <div class="notion-content">
    <template v-for="block in blocks" :key="block.id">
      <h2 v-if="block.type === 'heading_1'">{{ text(block.richText) }}</h2>
      <h3 v-else-if="block.type === 'heading_2'">{{ text(block.richText) }}</h3>
      <h4 v-else-if="block.type === 'heading_3'">{{ text(block.richText) }}</h4>
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
      <NotionContent v-if="block.children?.length" :blocks="block.children" />
    </template>
  </div>
</template>
