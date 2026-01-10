export const useQuestionStore = defineStore("question", () => {
  const currentIndex = ref(0);

  return { currentIndex };
});
