<template>
  <RecordTable :data="records" />
</template>

<script setup lang="ts">
import { recordsQuery, type RecordsQuery } from "./data";

const records = ref<RecordsQuery>([]);

async function getRecords() {
  const { data, error } = await recordsQuery();
  console.log({ data, error });
  if (error) throw error;

  records.value = data;
}

onMounted(async () => {
  await getRecords();
});
</script>

<style scoped></style>
