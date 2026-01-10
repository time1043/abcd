<template>
  <div class="grid grid-cols-5 gap-2">
    <div
      v-for="n in count"
      :key="n"
      @click="onClick(n)"
      class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer hover:bg-primary hover:text-white"
    >
      {{ n }}
    </div>
  </div>
</template>

<script setup lang="ts">
const prosp = defineProps<{
  count: number;
}>();

function onClick(n: number) {
  useQuestionStore().currentIndex = n - 1;
}
</script>

<style scoped></style>
