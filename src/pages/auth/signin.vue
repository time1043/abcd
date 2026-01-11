<template>
  <SigninForm v-model:form="form" />
</template>

<script setup lang="ts">
const form = reactive({
  email: "",
  password: "",
});
</script>

<style scoped></style>
