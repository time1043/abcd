<template>
  <SignupForm v-model:form="form" @submit="register" />
</template>

<script setup lang="ts">
import type { SignupForm } from "@/types/auth-form";
import { accountInsert, signup } from "./data";

const router = useRouter();

const form = reactive<SignupForm>({
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
});

async function register() {
  if (form.password !== form.confirmPassword) {
    // TODO: tell the user that the passwords don't match
    console.log("password don't match");
    return;
  }

  const { data, error } = await signup(form);
  console.log({ data, error });
  if (error) throw error;

  if (!data.user) throw error;
  const { error: error2 } = await accountInsert(form, data.user.id);
  console.log({ error2 });

  await useAccountStore().setAuth(data.session);
  router.push("/home/stat");
}
</script>

<style scoped></style>
