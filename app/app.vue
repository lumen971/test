<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)
watch(() => route.fullPath, () => { menuOpen.value = false })

useHead({ titleTemplate: (title) => title ? `${title}｜花火流明` : '花火流明｜靈性工作者與 VTuber' })
useSeoMeta({
  description: '花火流明的靈性工作室。透過能量狀態判讀、儀式與深度覺察，陪伴你重新對齊自身與世界的連結。',
  ogType: 'website',
  ogImage: '/images/hero-luminous-lotus.jpg',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <NuxtLink class="brand" to="/" aria-label="花火流明首頁">
        <img class="brand-logo" src="/images/logo-wordmark.png" alt="花火流明">
      </NuxtLink>
      <button class="menu-toggle" :aria-expanded="menuOpen" aria-label="切換導覽選單" @click="menuOpen = !menuOpen">☰</button>
      <nav :class="['site-nav', { open: menuOpen }]" aria-label="主要導覽">
        <NuxtLink to="/about">關於</NuxtLink>
        <NuxtLink to="/#services">靈性服務</NuxtLink>
        <NuxtLink to="/articles">靈感札記</NuxtLink>
        <NuxtLink to="/events">過往活動</NuxtLink>
        <NuxtLink to="/supporters">星光名錄</NuxtLink>
        <a class="nav-cta" href="https://t.co/l2cqY5jxsU" target="_blank" rel="noopener">預約諮詢</a>
      </nav>
    </header>
    <main><NuxtPage /></main>
    <footer class="site-footer">
      <NuxtLink class="footer-brand" to="/" aria-label="返回花火流明首頁">
        <img class="footer-logo" src="/images/logo-full.png" alt="花火流明">
      </NuxtLink>
      <p>整理自身狀態，重新對齊你與世界的連結。</p>
      <div class="footer-links"><a href="https://www.instagram.com/witch.lumen/">Instagram</a><a href="https://x.com/witch_lumen_TW">X</a><a href="https://www.youtube.com/@witch_lumen_TW">YouTube</a></div>
      <small>© 2026 Witch Lumen. All rights reserved.</small>
    </footer>
  </div>
</template>
