<template>
  <fieldset
    class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
  >
    <legend class="fieldset-legend">Register</legend>

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

    <label class="label">Confirm Password</label>
    <input
      type="password"
      class="input"
      placeholder="Confirm Password"
      v-model="form.confirmPassword"
    />

    <div class="flex justify-end mx-1">
      I already have an account: {{ " " }}
      <RouterLink to="/auth/signin" class="link link-primary">
        Login
      </RouterLink>
    </div>
    <button class="btn btn-primary mt-4">Register</button>
  </fieldset>
</template>

<script setup lang="ts">
const form = defineModel<{
  email: string;
  password: string;
  confirmPassword: string;
}>("form", { required: true });
</script>

<style scoped></style>
