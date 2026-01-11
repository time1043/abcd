export const useRecordStore = defineStore("record", () => {
  // k:questionId, v:userAnswers
  const userAnswers = ref<Record<number, number[]>>({});
  const submittedIds = ref<Record<number, boolean>>({});
  const correctIds = ref<Record<number, boolean>>({});

  function saveAnswer(
    id: number,
    indices: number[],
    submitted = false,
    isCorrect?: boolean
  ) {
    userAnswers.value[id] = indices;
    if (submitted) submittedIds.value[id] = true;
    if (isCorrect !== undefined) correctIds.value[id] = isCorrect;
  }

  function resetAnswer(id: number) {
    delete userAnswers.value[id];
    delete submittedIds.value[id];
    delete correctIds.value[id];
  }

  return { userAnswers, submittedIds, correctIds, saveAnswer, resetAnswer };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRecordStore, import.meta.hot));
}
