<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://witchlumen.com').replace(/\/$/, '')

useSeoMeta({
  title: '靈性服務',
  description: '花火流明提供能量狀態檢測、深層能量整理與會員長期維護。先理解狀態，再決定是否需要介入。',
  ogTitle: '靈性服務｜花火流明',
  ogDescription: '從清楚的狀態判讀開始，選擇此刻真正需要的支持。',
  ogUrl: `${siteUrl}/services`,
  ogImage: `${siteUrl}/images/hero-luminous-lotus.jpg`,
  twitterCard: 'summary_large_image'
})

useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/services` }] })

const services = [
  {
    id: 'assessment',
    index: '01',
    symbol: '◈',
    eyebrow: 'ENERGY ASSESSMENT',
    title: '能量狀態檢測',
    lead: '當你感覺不對勁，卻不確定問題從哪裡開始，先以判讀釐清當下的狀態與影響層級。',
    suitable: ['近期反覆感到疲憊、停滯或失去方向', '遇到重複發生的狀況，想理解背後可能的影響', '不確定自己是否需要進一步的能量整理', '希望先得到清楚判斷，再決定下一步'],
    includes: ['事前資訊確認', '當下能量狀態判讀', '需要介入的程度與方向說明', '後續觀察或服務建議'],
    note: '檢測的目的不是預設你一定有問題，而是確認此刻是否真的需要處理。'
  },
  {
    id: 'alignment',
    index: '02',
    symbol: '✧',
    eyebrow: 'DEEP ALIGNMENT',
    title: '深層能量整理',
    lead: '依照實際判讀結果，針對需要處理的層級進行有方向、有界線的能量介入與整理。',
    suitable: ['已完成狀態確認，且確實有進一步整理需求', '長期累積的狀態已影響生活與內在穩定', '希望在安全邊界內進行較深層的整理', '願意在服務後保留時間觀察與整合'],
    includes: ['介入前再次確認範圍', '依個別狀態進行能量整理', '過程中的狀態觀察', '完成後的整合提醒'],
    note: '整理方式與深度會依個別狀態調整，不套用固定流程，也不以追求強烈感受為目標。'
  },
  {
    id: 'membership',
    index: '03',
    symbol: '☽',
    eyebrow: 'CONTINUOUS CARE',
    title: '會員長期維護',
    lead: '以定期追蹤與狀態校準，陪伴需要持續觀察的人，減少問題在無意識中再次累積。',
    suitable: ['已有接受服務或進行長期自我整理的經驗', '希望以固定節奏觀察狀態變化', '需要穩定而不過度介入的長期支持', '理解會員服務不是即時救援或無限次處理'],
    includes: ['階段性狀態追蹤', '依需要進行校準與提醒', '會員方案所列的專屬內容', '累積支持紀錄與星光名錄'],
    note: '會員方案著重穩定陪伴，實際內容與當期辦法請以會員頁面的最新說明為準。'
  }
]

const faqs = [
  ['我應該從哪一項服務開始？', '如果你還不確定自己的狀態，建議先從能量狀態檢測開始。判讀後若不需要介入，也會如實說明。'],
  ['每個狀況都需要進行能量整理嗎？', '不需要。有些狀況適合先休息、觀察或尋求其他專業協助；是否介入會依當下狀態判斷。'],
  ['服務能保證結果嗎？', '不能。每個人的狀態、生活環境與整合速度不同，因此不承諾特定結果或立即改變。'],
  ['可以取代醫療或心理治療嗎？', '不可以。靈性服務不屬於醫療、心理治療、法律或財務服務；如有相關需求，請優先尋求合格專業人員。'],
  ['服務前需要準備什麼？', '請在相對安靜、不受打擾的環境中參與，並如實提供預約表單需要的資訊。其他準備會在確認預約時說明。'],
  ['費用、時間與服務形式在哪裡確認？', '各項服務的最新費用、時間、名額與進行方式，會在預約入口或確認訊息中完整列出。']
]
</script>

<template>
  <div class="services-page">
    <section class="services-hero">
      <div class="services-hero-copy">
        <p class="eyebrow">SPIRITUAL SERVICES</p>
        <h1>在介入之前，<br><em>先理解你此刻的狀態。</em></h1>
        <p>不是每一個不順都需要處理。服務從清楚的判讀開始，確認是否需要協助、適合的深度，以及應被尊重的界線。</p>
        <div class="services-actions"><a class="button primary" href="https://t.co/l2cqY5jxsU" target="_blank" rel="noopener">查看預約方式</a><a class="button ghost" href="#service-list">了解服務內容</a></div>
      </div>
      <div class="services-compass" aria-hidden="true"><span>☽</span><small>DISCERN · ALIGN · RETURN</small></div>
    </section>

    <section class="service-principles" aria-labelledby="principles-title">
      <div><p class="eyebrow">HOW I WORK</p><h2 id="principles-title">先判讀，再決定是否介入</h2></div>
      <div class="principle-grid">
        <article><span>01</span><h3>真實狀態</h3><p>不預設問題，也不為了進行服務而放大不安。</p></article>
        <article><span>02</span><h3>適合層級</h3><p>依照當下需求選擇觀察、調整或進一步整理。</p></article>
        <article><span>03</span><h3>清楚界線</h3><p>說明可協助的範圍，也誠實面對不適合介入的部分。</p></article>
      </div>
    </section>

    <section id="service-list" class="service-detail-list">
      <article v-for="service in services" :id="service.id" :key="service.id" class="service-detail">
        <div class="service-detail-title"><span>{{ service.index }}</span><div><p class="eyebrow">{{ service.eyebrow }}</p><h2>{{ service.title }}</h2><b aria-hidden="true">{{ service.symbol }}</b></div></div>
        <div class="service-detail-body">
          <p class="service-lead">{{ service.lead }}</p>
          <div class="service-columns">
            <section><h3>適合此刻的你，如果——</h3><ul><li v-for="item in service.suitable" :key="item">{{ item }}</li></ul></section>
            <section><h3>服務內容包含</h3><ul><li v-for="item in service.includes" :key="item">{{ item }}</li></ul></section>
          </div>
          <p class="service-note">{{ service.note }}</p>
          <a v-if="service.id !== 'membership'" class="service-link" href="https://t.co/l2cqY5jxsU" target="_blank" rel="noopener">查看預約與最新資訊　→</a>
          <a v-else class="service-link" href="https://lumen.oen.tw/" target="_blank" rel="noopener">查看會員方案　→</a>
        </div>
      </article>
    </section>

    <section class="service-process" aria-labelledby="process-title">
      <p class="eyebrow">SERVICE FLOW</p><h2 id="process-title">從確認需求，到回到穩定</h2>
      <ol><li><span>01</span><div><h3>閱讀與填寫</h3><p>閱讀服務內容與界線，提供判讀所需的基本資訊。</p></div></li><li><span>02</span><div><h3>確認預約</h3><p>確認適合的項目、時間、形式與當期費用。</p></div></li><li><span>03</span><div><h3>判讀與服務</h3><p>再次確認當下狀態，再依需要進行對應處理。</p></div></li><li><span>04</span><div><h3>觀察與整合</h3><p>服務後保留空間休息，依提醒觀察自身變化。</p></div></li></ol>
    </section>

    <section class="service-boundary" aria-labelledby="boundary-title">
      <div><p class="eyebrow">PROFESSIONAL BOUNDARIES</p><h2 id="boundary-title">服務界線與重要說明</h2></div>
      <div><p>靈性服務以狀態判讀、自我覺察與能量整理為方向，不提供醫療診斷、心理治療、法律判斷、投資建議，也不保證特定結果。</p><p>若你正經歷身體不適、心理危機、自傷或傷人風險，請優先聯繫當地醫療、心理或緊急支援資源。必要時，我也可能基於安全與專業界線婉拒或中止服務。</p></div>
    </section>

    <section class="service-faq" aria-labelledby="faq-title">
      <p class="eyebrow">FREQUENTLY ASKED QUESTIONS</p><h2 id="faq-title">預約前常見問題</h2>
      <div class="faq-list"><details v-for="item in faqs" :key="item[0]"><summary>{{ item[0] }}<span aria-hidden="true">＋</span></summary><p>{{ item[1] }}</p></details></div>
    </section>

    <section class="services-cta"><p class="eyebrow">BEGIN WITH CLARITY</p><h2>如果你還不確定需要什麼，<br>先從理解狀態開始。</h2><p>不急著處理，也不需要預先為自己下結論。</p><a class="button primary" href="https://t.co/l2cqY5jxsU" target="_blank" rel="noopener">查看能量檢測方式</a></section>
  </div>
</template>
