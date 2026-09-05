<script setup lang="ts">
useSeoMeta({
  title: '2026 新春祈福光明燈',
  description: '2026 新春祈福光明燈，透過光明燈寄放心願，讓燈光照亮心願。',
  ogImage: '/events/2026-blessing-light/banner.jpg'
})

const lights = [
  { name: '洪振豪', wish: '憶起初心，繼續未完成的旅途，探索的同時吸收、運用新知。' },
  { name: '村羽亓', wish: '願一切順利' },
  { name: 'gary', wish: '平安度過馬年，過得自在，穩定朝目標前進。' },
  { name: '飛斯特', wish: '希望心能獲得寧靜，並找到新的目標。' },
  { name: '塵歌', wish: '平安健康、財富無虞。' },
  { name: '超級高手', wish: '愛情順利，思考能力進步，財運廣進，身體健康，一切平安喜樂。' },
  { name: '天空寺啓介', wish: '事業順遂 → 成功轉職到適合長期發展的職位，工作穩定成長，三個月內上手並獲得主管肯定。財富增長 → 每月收入穩定提升，開始固定投資與儲蓄，年底存款明顯增加。智慧開展 → 持續學習行銷與專案能力，能獨立規劃並完成專案，思考更清晰、有策略。貴人扶持 → 需要資源的時候可以得到提攜和支持。平安健康 → 作息穩定、規律運動，身心狀態良好，精神專注有活力。' },
  { name: '張志豪', wish: '能在專業上有所成長。' },
  { name: '夜銃', wish: '早日當上主管，把債務都還清。' },
  { name: '林家華', wish: '希望今年所做的決定，自己都能問心無愧。' },
  { name: '蔡易倫', wish: '升官加薪。' },
  { name: '花火流明', wish: '每次開台都有人來看！訂閱制會員服務都一直有人穩定購買！' }
]

const query = ref('')
const selected = ref<typeof lights[number] | null>(null)
const showGuide = ref(false)
const audio = ref<HTMLAudioElement | null>(null)
const playing = ref(false)
const filteredLights = computed(() => query.value.trim() ? lights.filter(item => item.name.toLowerCase().includes(query.value.trim().toLowerCase())) : lights)

async function toggleAudio() {
  if (!audio.value) return
  if (playing.value) { audio.value.pause(); playing.value = false; return }
  try { await audio.value.play(); playing.value = true } catch { playing.value = false }
}

function closeDialogs(event: KeyboardEvent) {
  if (event.key === 'Escape') { selected.value = null; showGuide.value = false }
}

onMounted(() => window.addEventListener('keydown', closeDialogs))
onBeforeUnmount(() => window.removeEventListener('keydown', closeDialogs))
</script>

<template>
  <div class="blessing-page">
    <audio ref="audio" loop preload="none" src="/events/2026-blessing-light/light.mp3" @ended="playing = false"></audio>
    <section class="blessing-hero">
      <div class="blessing-hero-copy"><p class="eyebrow">ARCHIVED RITUAL · 2026</p><h1>新春祈福<br><em>光明燈</em></h1><p>將願望寄託於光中，讓每一盞燈陪伴心願走向顯化。</p><div class="blessing-actions"><a href="#lights" class="button primary">查看祈福燈</a><NuxtLink to="/events" class="button ghost">返回過往活動</NuxtLink></div></div>
    </section>

    <section id="lights" class="blessing-content">
      <div class="blessing-toolbar"><div><p class="eyebrow">THE LIGHTS OF WISHES</p><h2>十二道新春心願</h2></div><div class="blessing-controls"><label><span class="sr-only">搜尋登記名稱</span><input v-model="query" type="search" placeholder="輸入名稱尋找光明燈"></label><button type="button" @click="showGuide = true">心願顯化小魔法</button><button type="button" :aria-pressed="playing" @click="toggleAudio">音樂 {{ playing ? 'ON' : 'OFF' }}</button></div></div>
      <p v-if="query && !filteredLights.length" class="no-lights">找不到符合的名稱，請確認輸入文字。</p>
      <div v-else class="lantern-grid">
        <button v-for="item in filteredLights" :key="item.name" type="button" class="lantern-card" @click="selected = item">
          <span class="lantern-name">{{ item.name }}</span><img src="/events/2026-blessing-light/lantern.png" alt=""><span class="lantern-hint">點燈閱讀心願</span>
        </button>
      </div>
    </section>

    <Transition name="ritual-fade"><div v-if="selected" class="ritual-modal" role="dialog" aria-modal="true" aria-labelledby="wish-title" @click.self="selected = null"><article><button class="ritual-close" type="button" aria-label="關閉" @click="selected = null">×</button><p class="eyebrow">A WISH IN LIGHT · 2026</p><h2 id="wish-title">{{ selected.name }} 的心願</h2><p>{{ selected.wish }}</p><span aria-hidden="true">༺　✦　༻</span></article></div></Transition>
    <Transition name="ritual-fade"><div v-if="showGuide" class="ritual-modal" role="dialog" aria-modal="true" aria-labelledby="guide-title" @click.self="showGuide = false"><article><button class="ritual-close" type="button" aria-label="關閉" @click="showGuide = false">×</button><p class="eyebrow">WISH MANIFESTATION</p><h2 id="guide-title">心願顯化小魔法</h2><p>想像心願完成後的畫面：那時的你在什麼地方、做著什麼事、臉上是什麼表情，身邊又有哪些人與氣味。</p><p>讓自己彷彿已身處那個時刻，再搭配活動音樂與放在燈裡的心願，溫柔地強化顯化的力量。</p><span aria-hidden="true">相信，就會實現。</span></article></div></Transition>
  </div>
</template>
