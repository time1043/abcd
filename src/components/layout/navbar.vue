<template>
  <div class="navbar bg-base-100 shadow-sm">
    <!-- Mobile menu -->
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <template v-for="item in navConfig" :key="item.name">
            <!-- without children -->
            <li v-if="!item.children">
              <RouterLink :to="item.path"> {{ item.name }} </RouterLink>
            </li>
            <!-- with children -->
            <li v-else>
              <details>
                <summary>{{ item.name }}</summary>
                <ul class="p-2">
                  <li v-for="sub in item.children" :key="sub.name">
                    <RouterLink :to="sub.path">{{ sub.name }}</RouterLink>
                  </li>
                </ul>
              </details>
            </li>
          </template>
        </ul>
      </div>
      <Logo title="ABCD" />
    </div>

    <!-- Desktop Menu -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <template v-for="item in navConfig" :key="item.name">
          <!-- without children -->
          <li v-if="!item.children">
            <RouterLink :to="item.path">{{ item.name }}</RouterLink>
          </li>
          <!-- with children -->
          <li v-else>
            <details>
              <summary>{{ item.name }}</summary>
              <ul class="p-2 bg-base-100 w-40 z-1">
                <li v-for="sub in item.children" :key="sub.name">
                  <RouterLink :to="sub.path">{{ sub.name }}</RouterLink>
                </li>
              </ul>
            </details>
          </li>
        </template>
      </ul>
    </div>

    <div class="navbar-end gap-2">
      <!-- <a class="btn">Button</a> -->
      <ThemeController />

      <div class="dropdown dropdown-end">
        <Avatar v-if="isAuthed" />
        <RouterLink to="/auth/signin" v-if="!isAuthed">
          <button class="btn">Login</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navConfig } from "./data";

const { isAuthed } = storeToRefs(useAccountStore());
</script>

<style scoped>
@reference "@/assets/main.css";

:deep(.router-link-active) {
  @apply bg-primary text-primary-content;
}
</style>
