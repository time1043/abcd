<template>
  <ul class="list bg-base-100 rounded-box shadow-md w-full m-2">
    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
      Most played songs this week
    </li>

    <BucketListItem
      v-for="(bucket, i) in buckets"
      :key="bucket.id"
      :bucket="bucket"
      :i="i"
    />
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  buckets: {
    id: string;
    name: string;
  }[];
}>();
</script>

<style scoped></style>
