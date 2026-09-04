<script setup lang="ts">defineProps<{ eyebrow: string; title: string; description?: string }>()</script>
<template><header class="section-heading"><span>{{ eyebrow }}</span><h2>{{ title }}</h2><p v-if="description">{{ description }}</p></header></template>
