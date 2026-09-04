<script setup lang="ts">
useSeoMeta({
  title: '關於花火流明',
  description: '認識花火流明——結合 VTuber 創作、能量狀態判讀、薩滿療癒、聖火靈氣與芳療背景的靈性工作者。'
})

const profile = [
  ['名字', '花火流明'],
  ['英文名', 'Witch Lumen'],
  ['生日', '4 月 17 日'],
  ['身分', '靈性工作者・VTuber'],
  ['種族', '人類／女巫'],
  ['來自', '台灣'],
  ['粉絲名稱', '蠟燭／符紙'],
  ['代表符號', '🔮✨'],
  ['主要平台', 'Twitch'],
  ['直播時間', '每週日下午 14:00']
]

const journey = [
  { school: 'ALIZ 愛裡。時', title: '美國 NAHA 認證國際芳療師', text: '在這裡，我學習到與植物精油共同學習與創造，運用植物的自然力量，為身心注入和諧與活力。' },
  { school: '覺醒研究所＆秦芸殿天秦道學', title: '靈魂覺醒諮商講師認證・道學院正五品。秦星', text: '我學習到宇宙法則與內在探索的重要性，並將道學智慧融入靈性指導中，助人理清身心、重新與自我連結。' },
  { school: 'BlueStar 藍星身心靈整合療癒', title: '印加 Munay Ki 執行師・臼井／聖火 III 靈氣 大師階', text: '我接受了印加薩滿與守護者們的傳承與點化，學習使用聖火靈氣調節自身，並透過印加薩滿儀式和聖火靈氣來協助人們加強與自身的連結和感知。' }
]
</script>

<template>
  <div class="about-page">
    <section class="profile-hero">
      <div class="profile-image" role="img" aria-label="花火流明暫用角色形象">
        <span>暫用形象</span>
      </div>
      <div class="profile-intro">
        <p class="eyebrow">PROFILE · WITCH LUMEN</p>
        <h1>花火流明</h1>
        <p class="profile-kana">HANABI LUMEN — 靈性工作者／VTUBER</p>
        <p class="profile-lead">願我能成為你生命中一瞬的花火，照耀一刻的流明。</p>
        <div class="profile-links">
          <a href="https://www.youtube.com/@witch_lumen_TW" target="_blank" rel="noopener">YouTube</a>
          <a href="https://www.twitch.tv/witch_lumen" target="_blank" rel="noopener">Twitch</a>
          <a href="https://x.com/witch_lumen_TW" target="_blank" rel="noopener">X / Twitter</a>
          <a href="https://www.instagram.com/witch.lumen/" target="_blank" rel="noopener">Instagram</a>
        </div>
      </div>
      <div class="profile-seal" aria-hidden="true">☽<small>LUMEN</small></div>
    </section>

    <section class="about-content">
      <aside class="profile-card">
        <p class="eyebrow">BASIC INFORMATION</p>
        <h2>角色檔案</h2>
        <dl>
          <template v-for="item in profile" :key="item[0]">
            <dt>{{ item[0] }}</dt><dd>{{ item[1] }}</dd>
          </template>
        </dl>
        <p class="profile-note">願每一位蠟燭與符紙，都能在這裡找到一點照亮自己的微光。</p>
      </aside>

      <div class="about-story">
        <section>
          <p class="eyebrow">MY STORY</p>
          <h2>關於我</h2>
          <p>我是花火流明，一名以能量狀態判斷與深層能量整理為核心的靈性工作者。</p>
          <p>我的工作並非提供固定解法，也不以套用流程為目標。</p>
          <p>我負責的是辨識個案當下的能量狀態，判斷是否需要介入，以及適合的處理層級。</p>
          <p>在進入任何協助之前，我會先確認目前的狀態是否真的需要處理，處理的深度，以及是否存在長期影響的風險。</p>
          <p>某些狀況只需要調整與觀察，某些狀況則需要進一步介入，這是我主要承擔的判斷責任。</p>
          <p>我不以「讓人依賴」為目標，也不追求每一個狀況都進行處理。</p>
          <blockquote>願我能成為你生命中一瞬的花火，照耀一刻的流明。</blockquote>
          <p>我重視的是狀態的真實性與處理後的穩定度，確保每一次介入都有其必要性與邊界。</p>
        </section>

        <section class="journey-section">
          <p class="eyebrow">SPIRITUAL JOURNEY</p>
          <h2>我的靈性旅程</h2>
          <ol class="journey-list">
            <li v-for="(item, index) in journey" :key="item.school">
              <span class="journey-index">0{{ index + 1 }}</span>
              <div><small>{{ item.school }}</small><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
            </li>
          </ol>
        </section>
      </div>
    </section>

    <section class="belief-section">
      <p class="eyebrow">WHAT I BELIEVE</p>
      <h2>我相信，真正的協助<br>會把選擇權交還給你。</h2>
      <div class="belief-grid">
        <article><span>✦</span><h3>先判讀，再行動</h3><p>不是每一個不順都需要處理。先看清狀態，才知道真正需要的是什麼。</p></article>
        <article><span>◈</span><h3>專業與界線</h3><p>不承諾速效或保證結果，誠實說明可以介入的範圍與限制。</p></article>
        <article><span>☽</span><h3>回到自身力量</h3><p>工作的目的不是創造依賴，而是協助你重新建立與自己的連結。</p></article>
      </div>
      <div class="about-cta"><p>如果你不確定目前的狀態是否需要被處理，請先從能量檢測開始。</p><a class="button primary" href="https://t.co/l2cqY5jxsU">開始能量檢測</a></div>
    </section>
  </div>
</template>
