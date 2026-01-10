<template>
  <div class="flex gap-2 text-center">
    <div class="countdown font-mono text-2xl">
      <span :style="{ '--value': days }"></span> d
    </div>
    <div class="countdown font-mono text-2xl">
      <span :style="{ '--value': hours }"></span> h
    </div>
    <div class="countdown font-mono text-2xl">
      <span :style="{ '--value': minutes }"></span> m
    </div>
    <div class="countdown font-mono text-2xl">
      <span :style="{ '--value': seconds }"></span> s
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  seconds: number;
}>();

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

let timer: number;
let endTime = Date.now() + props.seconds * 1000;

function updateCountdown() {
  const now = Date.now();
  const distance = endTime - now;

  if (distance <= 0) {
    clearInterval(timer);
    days.value = hours.value = minutes.value = seconds.value = 0;
    return;
  }

  days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((distance / (1000 * 60 * 60)) % 24);
  minutes.value = Math.floor((distance / (1000 * 60)) % 60);
  seconds.value = Math.floor((distance / 1000) % 60);
}

onMounted(() => {
  updateCountdown();
  timer = window.setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

// 支持动态修改 durationSeconds
watch(
  () => props.seconds,
  (newVal) => {
    endTime = Date.now() + newVal * 1000;
    updateCountdown();
  }
);
</script>

<style scoped>
.countdown span {
  --value: 0;
}
</style>
