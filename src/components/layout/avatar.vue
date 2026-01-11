<template>
  <div>
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
      </div>
    </div>
    <ul
      tabindex="-1"
      class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
    >
      <li v-for="item in userMenuConfig" :key="item.name">
        <RouterLink :to="item.path" class="justify-between">
          {{ item.name }}
          <span v-if="item.badge" class="badge">{{ item.badge }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { userMenuConfig } from "./data";
</script>

<style scoped></style>
