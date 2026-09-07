<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const isNotFound = computed(() => props.error?.statusCode === 404)

useHead({
  title: isNotFound.value ? '找不到頁面｜花火流明' : '頁面暫時無法開啟｜花火流明',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

function goTo(path: string) {
  clearError({ redirect: path })
}
</script>

<template>
  <div class="error-page">
    <div class="error-stars" aria-hidden="true">
      <span>✦</span><span>✧</span><span>·</span><span>✦</span><span>✧</span>
    </div>

    <header class="error-header">
      <button type="button" class="error-brand" aria-label="返回花火流明首頁" @click="goTo('/')">
        <img src="/images/logo-wordmark.png" alt="花火流明">
      </button>
    </header>

    <main class="error-main">
      <div class="error-orbit" aria-hidden="true">
        <span>✦</span>
      </div>

      <p class="error-eyebrow">LOST AMONG THE STARS</p>
      <p class="error-code">{{ isNotFound ? '404' : error.statusCode }}</p>
      <h1>{{ isNotFound ? '這道星光暫時沒有通往任何地方' : '星光暫時受到了一點干擾' }}</h1>
      <p class="error-message">
        {{ isNotFound
          ? '你尋找的頁面可能已經移動、改名，或悄悄消失在夜色裡。讓我們循著光回到熟悉的地方。'
          : '頁面目前無法順利開啟，請稍後再試，或先回到首頁繼續探索。' }}
      </p>

      <nav class="error-actions" aria-label="錯誤頁面導覽">
        <button type="button" class="button primary" @click="goTo('/')">返回首頁</button>
        <button type="button" class="button ghost" @click="goTo('/articles')">閱讀靈感札記</button>
        <button type="button" class="error-text-link" @click="goTo('/services')">查看靈性服務 <span aria-hidden="true">→</span></button>
      </nav>
    </main>

    <footer class="error-footer">
      <small>© 2026 Witch Lumen</small>
    </footer>
  </div>
</template>

<style scoped>
.error-page {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100svh;
  overflow: hidden;
  color: var(--ink);
  background:
    radial-gradient(circle at 72% 36%, rgba(255, 0, 255, .11), transparent 23%),
    radial-gradient(circle at 24% 78%, rgba(52, 92, 128, .32), transparent 30%),
    linear-gradient(145deg, #07121e 0%, #0b1b2c 48%, #24152d 100%);
}

.error-page::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .22;
  background-image: radial-gradient(circle, rgba(241, 231, 210, .8) 0 1px, transparent 1.5px);
  background-size: 88px 88px;
  mask-image: linear-gradient(135deg, #000, transparent 70%);
}

.error-header {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: 30px clamp(24px, 5vw, 80px);
}

.error-brand {
  width: min(220px, 48vw);
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.error-brand img {
  display: block;
  width: 100%;
  height: auto;
}

.error-main {
  position: relative;
  z-index: 2;
  align-self: center;
  width: min(760px, calc(100% - 48px));
  margin: 20px auto 80px;
  text-align: center;
}

.error-eyebrow {
  margin: 0 0 6px;
  color: var(--gold);
  font-size: 11px;
  letter-spacing: .36em;
}

.error-code {
  margin: 0;
  color: transparent;
  font-family: var(--serif);
  font-size: clamp(92px, 18vw, 190px);
  font-weight: 600;
  line-height: .95;
  letter-spacing: .04em;
  -webkit-text-stroke: 1px rgba(214, 184, 117, .7);
  text-shadow: 0 0 50px rgba(96, 53, 120, .55);
}

.error-main h1 {
  margin: 28px auto 18px;
  color: #f3ead8;
  font-family: var(--serif);
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 600;
  line-height: 1.45;
  letter-spacing: .04em;
  text-wrap: balance;
}

.error-message {
  max-width: 610px;
  margin: 0 auto;
  color: #adbdca;
  font-size: 16px;
  line-height: 1.9;
}

.error-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 38px;
}

.error-actions button {
  cursor: pointer;
}

.error-actions .ghost {
  color: var(--ink);
  background: rgba(9, 22, 37, .48);
}

.error-text-link {
  padding: 10px 8px;
  border: 0;
  color: var(--gold);
  background: transparent;
  font-size: 13px;
  letter-spacing: .08em;
}

.error-text-link span {
  display: inline-block;
  transition: transform .3s ease;
}

.error-text-link:hover span {
  transform: translateX(4px);
}

.error-orbit {
  position: absolute;
  z-index: -1;
  top: 34%;
  left: 50%;
  width: min(560px, 78vw);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(214, 184, 117, .12);
  border-radius: 50%;
}

.error-orbit::before,
.error-orbit::after {
  content: '';
  position: absolute;
  inset: 14%;
  border: 1px solid rgba(214, 184, 117, .09);
  border-radius: 50%;
}

.error-orbit::after {
  inset: 31%;
}

.error-orbit > span {
  position: absolute;
  top: 9%;
  right: 13%;
  color: var(--gold);
  text-shadow: 0 0 18px rgba(255, 0, 255, .75);
}

.error-stars span {
  position: absolute;
  z-index: 1;
  color: rgba(214, 184, 117, .55);
  text-shadow: 0 0 18px rgba(255, 0, 255, .45);
}

.error-stars span:nth-child(1) { top: 18%; left: 12%; }
.error-stars span:nth-child(2) { top: 27%; right: 16%; font-size: 22px; }
.error-stars span:nth-child(3) { bottom: 23%; left: 18%; font-size: 28px; }
.error-stars span:nth-child(4) { right: 10%; bottom: 18%; }
.error-stars span:nth-child(5) { top: 46%; left: 7%; }

.error-footer {
  position: relative;
  z-index: 2;
  padding: 24px;
  color: rgba(159, 176, 194, .66);
  text-align: center;
  letter-spacing: .08em;
}

@media (max-width: 600px) {
  .error-header {
    justify-content: flex-start;
    padding-block: 24px;
  }

  .error-main {
    width: min(100% - 36px, 620px);
    margin-bottom: 45px;
  }

  .error-main h1 {
    margin-top: 22px;
  }

  .error-actions {
    flex-direction: column;
    margin-top: 30px;
  }

  .error-actions .button {
    width: min(100%, 320px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .error-text-link span {
    transition: none;
  }
}
</style>
