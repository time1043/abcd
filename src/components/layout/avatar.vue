<template>
  <div>
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://avatars.githubusercontent.com/u/132178516?s=400&u=9c885366fc78ce8106419fb8751e4cc1654f4e70&v=4"
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
          <span v-if="item.badge" class="badge">
            {{ item.badge }}
          </span>
        </RouterLink>
        <span @click="logout">Logout</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { signOut } from "@/pages/auth/data";
import { userMenuConfig } from "./data";

const router = useRouter();

async function logout() {
  await signOut();
  router.push("/auth/signin");
}
</script>

<style scoped></style>
