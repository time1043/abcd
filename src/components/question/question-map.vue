<template>
  <div class="grid grid-cols-5 gap-2">
    <div
      v-for="(question, index) in questions"
      :key="question.id"
      @click="onClick(index)"
      class="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
      :class="buttonClass(question.id)"
    >
      {{ index + 1 }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "@/types/question";

const props = defineProps<{
  questions: Question[];
}>();

const recordStore = useRecordStore();

function onClick(index: number) {
  useQuestionStore().currentIndex = index;
  useDrawerStore().toggle();
}

function buttonClass(id: number) {
  const isCorrect = recordStore.correctIds[id];
  if (isCorrect === undefined) return "border border-gray-300 ";
  if (isCorrect) return "bg-primary text-white";
  return "bg-error text-white";
}
</script>

<style scoped></style>
