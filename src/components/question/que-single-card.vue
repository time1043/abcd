<template>
  <div class="card bg-base-100 w-full shadow-sm my-2">
    <div class="card-body">
      <h2 class="card-title">{{ question?.id }}</h2>

      <p>{{ question?.description }}</p>
      <div v-for="(cho, index) in question?.choices" :key="index">
        <button
          class="btn w-full justify-start h-auto text-left py-2"
          :class="buttonClass(index)"
          @click="select(index)"
        >
          <span class="font-bold">{{ String.fromCharCode(65 + index) }}.</span>
          <span class="font-normal">{{ cho }}</span>
        </button>
      </div>

      <div v-if="hasAnswered" class="card-actions justify-end mt-4">
        <button class="btn btn-ghost btn-sm" @click="reset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "@/types/question";

const props = defineProps<{
  question: Question;
}>();

// 0,1,2,3
const selectedIndex = ref<number | null>(null);
const hasAnswered = computed(() => selectedIndex.value !== null);
// ["A"] -> [0]
const correctIndex = computed(
  () => props.question.answers[0]!.charCodeAt(0) - 65
);

function select(index: number) {
  if (selectedIndex.value !== null) return;
  selectedIndex.value = index;

  // If the user selected the correct answer
  // then move to the next question after 1 second
  if (selectedIndex.value === correctIndex.value) {
    setTimeout(() => {
      useQuestionStore().currentIndex++;
    }, 1000);
  }
}

function buttonClass(index: number) {
  // If the user has not answered yet
  if (selectedIndex.value === null) return "btn-outline";

  // If the index is the correct answer
  // If the index is the user's selected answer but is incorrect
  if (index === correctIndex.value) return "btn-primary";
  if (index === selectedIndex.value) return "btn-error";
  else return "btn-ghost";
}

function reset() {
  selectedIndex.value = null;
}
</script>

<style scoped></style>
