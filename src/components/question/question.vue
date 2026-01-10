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
const props = defineProps<{
  questions: {
    id: number;
    description: string;
    choices: string[];
    answers: string[];
  }[];
}>();
</script>

<style scoped></style>
