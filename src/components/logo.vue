<template>
  <RouterLink to="/" class="flex items-center gap-2">
    <img src="/ai-logo.png" alt="Logo" class="w-12" />
    <span class="text-3xl font-bold italic px-2">{{ title }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<style scoped></style>
