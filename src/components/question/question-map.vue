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
  useRecordStore().currentIndex = index;
  useDrawerStore().toggle();
}

const correctIds = computed(() => {
  const result: Record<number, boolean> = {};

  for (const q of props.questions) {
    const userAnswer = recordStore.userAnswers[q.id];
    if (!userAnswer) continue;

    const correctIndices = q.answers.map((a) => a.charCodeAt(0) - 65);
    const isCorrect =
      userAnswer.length === correctIndices.length &&
      userAnswer.every((i) => correctIndices.includes(i));

    result[q.id] = isCorrect;
  }

  return result;
});

function buttonClass(id: number) {
  const isCorrect = correctIds.value[id];
  if (isCorrect === undefined) return "border border-gray-300 ";
  if (isCorrect) return "bg-primary text-white";
  return "bg-error text-white";
}
</script>

<style scoped></style>
