<template>
  <Question :questions />
</template>

<script setup lang="ts">
import type { Question } from "@/types/question";
import { bucketQuestionsQuery } from "./data";

const questions = ref<Question[]>([]);

const route = useRoute("/home/bucket/[id]");
const bucketId = computed(() => route.params.id);

async function getQuestions() {
  const { data, error } = await bucketQuestionsQuery(bucketId.value);
  console.log({ data, error });
  if (error) throw new Error();
  questions.value = data as Question[];
}

onMounted(async () => {
  getQuestions();
});
</script>

<style scoped></style>
