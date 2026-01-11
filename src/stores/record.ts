export const useRecordStore = defineStore("record", () => {
  // k:questionId, v:userAnswers
  const userAnswers = ref<Record<number, number[]>>({});
  const submittedIds = ref<Record<number, boolean>>({});

  function saveAnswer(id: number, indices: number[], submitted = false) {
    userAnswers.value[id] = indices;
    if (submitted) submittedIds.value[id] = true;
  }

  function resetAnswer(id: number) {
    delete userAnswers.value[id];
    delete submittedIds.value[id];
  }

  return { userAnswers, submittedIds, saveAnswer, resetAnswer };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRecordStore, import.meta.hot));
}
