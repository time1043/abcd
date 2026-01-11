<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden">
    <RouterView class="flex-1 min-h-0" />
  </div>
</template>

<script setup lang="ts">
import { getSession } from "./pages/auth/data";

onMounted(async () => {
  const { data } = await getSession();
  useAccountStore().setAuth(data.session);
});
</script>

<style scoped></style>
