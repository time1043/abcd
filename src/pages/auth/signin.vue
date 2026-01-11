<template>
  <SigninForm v-model:form="form" @submit="login" />
</template>

<script setup lang="ts">
import type { SigninForm } from "@/types/auth-form";
import { signin } from "./data";

const router = useRouter();

const form = reactive<SigninForm>({
  email: "",
  password: "",
});

async function login() {
  const { data, error } = await signin(form);
  console.log({ data, error });
  if (error) throw error;

  await useAccountStore().setAuth(data.session);
  router.push("/home/stat");
}
</script>

<style scoped></style>
