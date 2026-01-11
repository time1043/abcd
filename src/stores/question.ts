export const useQuestionStore = defineStore("question", () => {
  const currentIndex = ref(0);

  return { currentIndex };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuestionStore, import.meta.hot));
}
