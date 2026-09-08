<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  title: string
  description?: string
  as?: 'h1' | 'h2'
}>(), { as: 'h2' })
</script>

<template>
  <header class="section-heading">
    <span>{{ eyebrow }}</span>
    <component :is="as" class="section-heading-title">{{ title }}</component>
    <p v-if="description">{{ description }}</p>
  </header>
</template>
