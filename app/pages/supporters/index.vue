<script setup lang="ts">
import { config } from '@fortawesome/fontawesome-svg-core'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faStar, fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { SupporterMonth, SupporterOverview, SupporterProfile } from '../../../shared/types/content'

useSeoMeta({ title: '星光名錄', description: '感謝每一位支持花火流明持續創作與提供靈性服務的贊助人，並收藏一路相伴的星光足跡。' })

config.autoAddCss = false
const freeSolidIcons = new Map<string, IconDefinition>(Object.values(fas).map(icon => [icon.iconName, icon]))

function supporterIcon(iconName?: string): IconDefinition {
  const normalizedName = (iconName || '').trim().toLowerCase().replace(/^fa-/, '')
  return freeSolidIcons.get(normalizedName) || faStar
}

const { data: latest } = await useFetch<SupporterMonth>('/api/supporters/latest')
const { data: overview } = await useFetch<SupporterOverview>('/api/supporters/overview')
const selectedMonth = ref(latest.value?.month || '')
const historyData = ref<SupporterMonth | null>(latest.value || null)
const historyLoading = ref(false)
const historyError = ref(false)

const monthOptions = computed(() => {
  const newest = latest.value?.month
  const earliest = overview.value?.earliestMonth || newest
  if (!newest || !earliest) return []
  const options: { value: string; label: string }[] = []
  let [year, month] = newest.split('-').map(Number)
  const [endYear, endMonth] = earliest.split('-').map(Number)
  while (year > endYear || (year === endYear && month >= endMonth)) {
    const value = `${year}-${String(month).padStart(2, '0')}`
    options.push({ value, label: `${year} 年 ${month} 月` })
    month -= 1
    if (month === 0) { year -= 1; month = 12 }
  }
  return options
})

function cardLevel(profile: SupporterProfile) {
  if (profile.totalMonths >= 48) return 'legendary'
  if (profile.totalMonths >= 36) return 'eternal'
  if (profile.totalMonths >= 24) return 'radiant'
  if (profile.totalMonths >= 12) return 'anniversary'
  if (profile.totalMonths >= 6) return 'steady'
  return 'ember'
}

function milestone(profile: SupporterProfile) {
  const months = Math.max(0, profile.totalMonths)
  const thresholds = [6, 12, 24, 36, 48]
  const next = thresholds.find(value => value > months)
  if (!next) return { label: '傳說花火・長久相伴', progress: 100 }
  const previous = [...thresholds].reverse().find(value => value <= months) || 0
  return { label: `距離下一階還有 ${next - months} 個月`, progress: Math.round(((months - previous) / (next - previous)) * 100) }
}

async function loadHistory() {
  if (!selectedMonth.value) return
  if (selectedMonth.value === latest.value?.month) {
    historyData.value = latest.value
    historyError.value = false
    return
  }
  historyLoading.value = true
  historyError.value = false
  try {
    historyData.value = await $fetch<SupporterMonth | null>(`/api/supporters/${selectedMonth.value}`)
  } catch {
    historyData.value = null
    historyError.value = true
  } finally {
    historyLoading.value = false
  }
}
</script>

<template>
  <div class="page-wrap supporters-page">
    <SectionHeading eyebrow="STARDUST SUPPORTERS" title="星光名錄" description="每一道微光，都在花火流明的旅程中留下獨一無二的軌跡。" />

    <section v-if="overview?.profiles.length" class="supporter-hall" aria-labelledby="hall-title">
      <div class="supporter-section-heading">
        <div><p class="eyebrow">HALL OF LIGHT</p><h2 id="hall-title">長期星光殿堂</h2></div>
        <p>支持的時間會化為不同徽章，收藏我們共同走過的季節。</p>
      </div>
      <div class="supporter-card-grid">
        <article v-for="profile in overview.profiles" :key="profile.id" :class="['supporter-card', `is-${cardLevel(profile)}`]">
          <span class="card-constellation" aria-hidden="true">✦ · ✧ · ☽</span>
          <div class="supporter-card-top"><span class="supporter-emoji" aria-hidden="true"><FontAwesomeIcon :icon="supporterIcon(profile.emoji)" /></span><span class="supporter-badge">{{ profile.badge }}</span></div>
          <h3>{{ profile.name }}</h3>
          <p v-if="profile.message" class="supporter-message">「{{ profile.message }}」</p>
          <p v-else class="supporter-message">謝謝你，成為這段旅程中持續閃耀的光。</p>
          <div class="supporter-meta"><span>累積支持 <b>{{ profile.totalMonths }}</b> 個月</span><span>{{ profile.currentTier }}</span></div>
          <div class="milestone"><div><span>{{ milestone(profile).label }}</span><span>{{ milestone(profile).progress }}%</span></div><div class="milestone-track"><span :style="{ width: `${milestone(profile).progress}%` }"></span></div></div>
        </article>
      </div>
    </section>

    <section v-if="latest" class="current-supporters" aria-labelledby="current-title">
      <div class="supporter-section-heading"><div><p class="eyebrow">THIS MONTH</p><h2 id="current-title">{{ latest.label }}</h2></div><p>{{ latest.message }}</p></div>
      <div class="support-tiers"><section v-for="group in latest.groups" :key="group.tier" class="tier-card"><span>✦</span><h2>{{ group.tier }}</h2><ul><li v-for="member in group.members" :key="member">{{ member }}</li></ul></section></div>
    </section>

    <section class="supporter-archive" aria-labelledby="archive-title">
      <div class="supporter-section-heading"><div><p class="eyebrow">STARLIGHT ARCHIVE</p><h2 id="archive-title">歷史名錄</h2></div><p>選擇月份後才會載入該期名單，讓長久累積的紀錄依然輕盈。</p></div>
      <label class="month-picker">選擇月份<select v-model="selectedMonth" @change="loadHistory"><option v-for="option in monthOptions" :key="option.value" :value="option.value">{{ option.label }}</option></select></label>
      <p v-if="historyLoading" class="archive-status">正在喚醒這個月份的星光……</p>
      <p v-else-if="historyError" class="archive-status">暫時無法讀取名錄，請稍後再試。</p>
      <p v-else-if="!historyData" class="archive-status">這個月份尚未建立公開名錄。</p>
      <div v-else class="support-tiers archive-tiers"><section v-for="group in historyData.groups" :key="group.tier" class="tier-card"><span>✦</span><h2>{{ group.tier }}</h2><ul><li v-for="member in group.members" :key="member">{{ member }}</li></ul></section></div>
    </section>

    <p class="privacy-note">名單僅顯示同意公開的名稱；公開設定、稱呼與卡片內容皆可隨時在 Notion 調整。</p>
  </div>
</template>
