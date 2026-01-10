<template>
  <BucketList :buckets />
</template>

<script setup lang="ts">
import { bucketQuery, type BuckerQuery } from "./data";

const buckets = ref<BuckerQuery>([]);

async function getBucket() {
  const { data, error } = await bucketQuery;
  console.log({ data, error });
  if (error) throw new Error();

  buckets.value = data;
}

onMounted(async () => {
  await getBucket();
});
</script>

<style scoped></style>
