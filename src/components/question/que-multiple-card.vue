<template>
  <div class="card bg-base-100 w-full shadow-sm my-2">
    <div class="card-body">
      <div class="flex justify-between items-start">
        <h2 class="card-title">{{ question?.id }}</h2>
        <div class="badge badge-secondary badge-outline">Multiple</div>
      </div>

      <p>{{ question?.description }}</p>
      <div v-for="(cho, index) in question?.choices" :key="index" class="mt-2">
        <button
          class="btn w-full justify-start h-auto text-left py-2"
          :class="buttonClass(index)"
          @click="toggleSelect(index)"
        >
          <span class="font-bold">{{ String.fromCharCode(65 + index) }}.</span>
          <span class="font-normal">{{ cho }}</span>
        </button>
      </div>

      <div class="card-actions justify-end mt-4">
        <button
          v-if="!hasAnswered"
          class="btn btn-primary btn-sm"
          :disabled="selectedIndices.length === 0"
          @click="submit"
        >
          Submit
        </button>
        <button v-else class="btn btn-ghost btn-sm" @click="reset">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "@/types/question";

const props = defineProps<{
  question: Question;
}>();

const recordStore = useRecordStore();

// [0, 2]
// const selectedIndices = ref<number[]>([]);
// const hasAnswered = ref(false);
const savedAnswers = computed(
  () => recordStore.userAnswers[props.question.id] || []
);
const selectedIndices = ref<number[]>([...savedAnswers.value]);
const hasAnswered = computed(
  () => !!recordStore.submittedIds[props.question.id]
);

// ["A", "C"] -> [0, 2]
const correctIndices = computed(() =>
  props.question.answers.map((letter) => letter.charCodeAt(0) - 65)
);

function toggleSelect(index: number) {
  // After submission, disallow modification
  if (hasAnswered.value) return;

  // If already selected, remove
  // If not selected, add
  if (selectedIndices.value.includes(index))
    selectedIndices.value = selectedIndices.value.filter((i) => i !== index);
  else selectedIndices.value.push(index);
}

function submit() {
  // Allow submit when at least one option is selected
  if (selectedIndices.value.length === 0) return;

  // Check if all selected indices match the correct indices
  const sorted = [...selectedIndices.value].sort();
  const correctSorted = [...correctIndices.value].sort();
  const isCorrect =
    sorted.length === correctSorted.length &&
    sorted.every((v, i) => v === correctSorted[i]);

  recordStore.saveAnswer(
    props.question.id,
    selectedIndices.value,
    true,
    isCorrect
  );
}

function buttonClass(index: number) {
  const isSelected = selectedIndices.value.includes(index);
  const isCorrect = correctIndices.value.includes(index);

  if (!hasAnswered.value) return isSelected ? "btn-neutral" : "btn-outline";

  if (isSelected && isCorrect) return "btn-outline btn-primary";
  if (isSelected && !isCorrect) return "btn-error";
  if (!isSelected && isCorrect) return "btn-primary";
  if (!isSelected && !isCorrect) return "btn-ghost";
}

function reset() {
  selectedIndices.value = [];
  // hasAnswered.value = false;
  recordStore.resetAnswer(props.question.id);
}
</script>
