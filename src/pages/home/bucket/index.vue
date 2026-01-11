<template>
  <BucketList :buckets />
</template>

<script setup lang="ts">
import { bucketsQuery, type BuckersQuery } from "./data";

const buckets = ref<BuckersQuery>([]);

async function getBuckets() {
  const { data, error } = await bucketsQuery;
  // console.log({ data, error });
  if (error) throw error;

  buckets.value = data;
}

onMounted(async () => {
  await getBuckets();
});
</script>

<style scoped></style>
