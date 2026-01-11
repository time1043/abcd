<template>
  <fieldset
    class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
  >
    <legend class="fieldset-legend">Login</legend>

    <label class="label">Email</label>
    <input
      type="email"
      class="input"
      placeholder="Email"
      v-model="form.email"
    />

    <label class="label">Password</label>
    <input
      type="password"
      class="input"
      placeholder="Password"
      v-model="form.password"
    />

    <div class="flex justify-end mx-1">
      I don't have an account: {{ " " }}
      <RouterLink to="/auth/signup" class="link link-primary">
        Register
      </RouterLink>
    </div>
    <button class="btn btn-primary mt-4">Login</button>
  </fieldset>
</template>

<script setup lang="ts">
const form = defineModel<{
  email: string;
  password: string;
}>("form", { required: true });
</script>

<style scoped></style>
