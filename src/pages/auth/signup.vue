<template>
  <SignupForm v-model:form="form" />
</template>

<script setup lang="ts">
const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});
</script>

<style scoped></style>
