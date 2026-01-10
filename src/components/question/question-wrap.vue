<template>
  <div class="flex flex-col h-full w-full p-2">
    <!-- Progress -->
    <div class="flex-none flex flex-col items-center gap-2 mb-4">
      <input
        type="range"
        min="0"
        :max="questions.length - 1"
        v-model.number="currentIndex"
        class="range range-primary w-full"
      />
      <div class="w-full flex justify-between">
        <Countdown :seconds="60 * 60" />
        {{ currentIndex + 1 }} / {{ questions.length }}
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-y-auto mb-4 px-1">
      <slot :question="currentQuestion" :index="currentIndex" />
      <div class="h-4"></div>
    </div>

    <!-- Map -->
    <div class="drawer">
      <input
        id="my-drawer-1"
        type="checkbox"
        class="drawer-toggle"
        v-model="isOpen"
      />
      <div class="drawer-content">
        <!-- Page content here -->
        <div class="fab bottom-20">
          <label
            for="my-drawer-1"
            class="btn drawer-button btn-lg btn-circle btn-primary"
          >
            M
          </label>
        </div>
      </div>
      <div class="drawer-side">
        <label
          for="my-drawer-1"
          aria-label="close sidebar"
          class="drawer-overlay"
        />
        <ul class="menu bg-base-200 min-h-full w-80 p-4">
          <QuestionMap :count="questions.length" />
        </ul>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex-none join grid grid-cols-2 gap-2 w-full bg-base-100">
      <button
        class="btn btn-primary join-item"
        :disabled="currentIndex === 0"
        @click="prev"
      >
        Previous
      </button>
      <button
        class="btn btn-primary join-item"
        :disabled="currentIndex === questions.length - 1"
        @click="next"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "@/types/question";
import QuestionMap from "./question-map.vue";
import { useDrawerStore } from "@/stores/ui/drawer";

const { isOpen } = storeToRefs(useDrawerStore());

const props = defineProps<{
  questions: Question[];
}>();

// const currentIndex = ref(0);
const { currentIndex } = storeToRefs(useQuestionStore());
const currentQuestion = computed(() => {
  return props.questions[currentIndex.value];
});

function next() {
  if (currentIndex.value < props.questions.length - 1) {
    currentIndex.value++;
    scrollToTop();
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    scrollToTop();
  }
}

function scrollToTop() {
  const contentArea = document.querySelector(".overflow-y-auto");
  if (contentArea) contentArea.scrollTop = 0;
}
</script>
