<script setup lang="ts">
import type { ArticleSummary, SupporterMonth } from '../../shared/types/content'
const { data: articles } = await useFetch<ArticleSummary[]>('/api/articles')
const { data: supporters } = await useFetch<SupporterMonth>('/api/supporters/latest')
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-bg" aria-hidden="true" />
      <div class="hero-copy">
        <p class="eyebrow">SPIRITUAL WORKER · VTUBER</p>
        <h1>在星光與靈魂之間，<br><em>找回你的內在座標。</em></h1>
        <p class="hero-lead">我是花火流明，一名以能量狀態判讀與深層整理為核心的靈性工作者，也是一位在虛實之間傳遞微光的 VTuber。</p>
        <div class="hero-actions"><a class="button primary" href="https://t.co/l2cqY5jxsU">開始能量檢測</a><NuxtLink class="button ghost" to="/articles">閱讀靈感札記</NuxtLink></div>
      </div>
      <div class="hero-orbit" aria-hidden="true"><span>☾</span></div>
      <p class="image-note">暫用形象視覺 · 正式立繪可直接替換</p>
    </section>

    <section id="about" class="section about-grid">
      <div><SectionHeading eyebrow="ABOUT LUMEN" title="專業判讀，溫柔陪伴" /></div>
      <div class="about-copy"><p>我的工作並非提供固定解法，也不以套用流程為目標。我負責辨識個案當下的能量狀態，判斷是否需要介入，以及適合的處理層級。</p><p>我重視狀態的真實性、服務的邊界，以及每一次介入後能否回到穩定。神秘並不等於模糊，靈性工作也可以清楚而專業。</p><div class="credential-row"><span>薩滿療癒</span><span>聖火靈氣</span><span>國際芳療</span><span>靈魂覺察</span></div></div>
    </section>

    <section id="services" class="section tinted">
      <SectionHeading eyebrow="SPIRITUAL SERVICES" title="依照此刻的你，選擇適合的支持" description="先理解狀態，再決定是否介入。每項服務都從清楚的判讀開始。" />
      <div class="service-grid">
        <article class="service-card"><span>01</span><div class="card-icon">◈</div><h3>能量狀態檢測</h3><p>釐清現況與影響層級，確認當下是否真的需要處理。</p><a href="https://t.co/l2cqY5jxsU">了解檢測方式 →</a></article>
        <article class="service-card featured"><span>02</span><div class="card-icon">✧</div><h3>深層能量整理</h3><p>依照個案實際狀態，進行有邊界且具方向性的能量介入。</p><a href="https://t.co/l2cqY5jxsU">探索服務內容 →</a></article>
        <article class="service-card"><span>03</span><div class="card-icon">☽</div><h3>會員長期維護</h3><p>每月穩定追蹤與校準，降低問題再次累積的可能。</p><a href="https://lumen.oen.tw/">查看會員方案 →</a></article>
      </div>
    </section>

    <section class="section">
      <div class="section-top"><SectionHeading eyebrow="LUMEN JOURNAL" title="靈感札記" description="關於能量、覺察與靈性生活的書寫。" /><NuxtLink to="/articles">查看所有文章 →</NuxtLink></div>
      <div class="article-grid"><article v-for="article in articles?.slice(0, 3)" :key="article.id" class="article-card"><div class="article-cover"><span>{{ article.category }}</span></div><div><time>{{ article.publishedAt }}</time><h3>{{ article.title }}</h3><p>{{ article.excerpt }}</p><NuxtLink :to="`/articles/${article.slug}`">繼續閱讀 →</NuxtLink></div></article></div>
    </section>

    <section v-if="supporters" class="supporter-band">
      <div><p class="eyebrow">STARDUST SUPPORTERS · {{ supporters.label }}</p><h2>謝謝每一道陪伴我的星光</h2><p>{{ supporters.message }}</p><NuxtLink class="button ghost" to="/supporters">查看本月星光名錄</NuxtLink></div>
      <div class="constellation" aria-hidden="true">✦　·　✧<br>　☽　　✦<br>·　　✧　·</div>
    </section>
  </div>
</template>
