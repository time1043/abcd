<template>
  <QuestionWrap :questions>
    <template #default="{ question }">
      <QueSingleCard
        v-if="question?.answers.length === 1"
        :key="question.id"
        :question
      />
      <QueMultipleCard
        v-if="question && question?.answers.length !== 1"
        :key="question?.id"
        :question
      />
    </template>
  </QuestionWrap>
</template>

<script setup lang="ts">
import type { Question } from "@/types/question";

const props = defineProps<{
  questions: Question[];
}>();
</script>

<style scoped></style>
