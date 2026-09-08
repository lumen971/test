<script setup lang="ts">
usePageSeo({
  title: '過往活動',
  description: '收藏花火流明曾舉辦的靈性企劃、季節儀式、祈福活動與 VTuber 特別企劃。',
  path: '/events',
  imageAlt: '花火流明過往活動與季節儀式',
  schemaType: 'CollectionPage'
})
</script>

<template>
  <div class="page-wrap events-index">
    <SectionHeading as="h1" eyebrow="PAST RITUALS & EVENTS" title="過往活動" description="每一次相聚，都是時間裡留下的一束光。這裡收藏曾經舉辦的季節儀式、祈福企劃與特別活動。" />
    <div class="event-grid">
      <NuxtLink class="event-card" to="/2026-blessing-light">
        <div class="event-card-image"><img src="/events/2026-blessing-light/banner.jpg" alt="2026 新春祈福光明燈"></div>
        <div class="event-card-body"><p class="eyebrow">2026 · NEW YEAR RITUAL</p><h2>2026 新春祈福光明燈</h2><p>透過光明燈寄放心願，讓溫柔燈火照亮新一年的方向。</p><span>進入活動回憶　→</span></div>
      </NuxtLink>
    </div>
  </div>
</template>
