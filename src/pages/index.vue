<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img
        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        class="max-w-sm rounded-lg shadow-2xl"
      />
      <div class="flex flex-col items-center lg:items-start">
        <Logo title="ABCD ▶▶︎" />
        <p class="py-6">This project is a disposable exam-cramming tool.</p>
        <RouterLink to="/home/stat">
          <button class="btn btn-primary">Get Started</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
