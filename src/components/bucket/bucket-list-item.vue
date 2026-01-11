<template>
  <li class="list-row">
    <div class="text-4xl font-thin opacity-30 tabular-nums">
      {{ i + 1 }}
    </div>
    <div>
      <img
        class="size-10 rounded-box"
        src="https://img.daisyui.com/images/profile/demo/1@94.webp"
      />
    </div>
    <div class="list-col-grow">
      <div>{{ bucket.name }}</div>
      <div class="text-xs uppercase font-semibold opacity-60">
        Remaining Reason
      </div>
    </div>
    <button class="btn btn-square btn-ghost" @click="onClick">
      <svg
        class="size-[1.2em]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2"
          fill="none"
          stroke="currentColor"
        >
          <path d="M6 3L20 12 6 21 6 3z"></path>
        </g>
      </svg>
    </button>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  bucket: { id: string; name: string };
  i: number;
}>();

const router = useRouter();

function onClick() {
  router.push(`/home/bucket/${props.bucket.id}`);
}
</script>

<style scoped></style>
