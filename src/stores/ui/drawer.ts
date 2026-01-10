export const useDrawerStore = defineStore("drawer", () => {
  const isOpen = ref(false);

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  return { isOpen, toggle };
});
