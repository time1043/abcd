import { recordInsert, recordUpsert } from "@/pages/home/record/data";
import type { RecordBucketDetails, RecordStores } from "@/types/record";
import type { Question } from "@/types/question";

export const useRecordStore = defineStore("record", () => {
  const currentIndex = ref(0); // current question index

  const recordId = ref<string | null>(null);
  const bucketId = ref<string | null>(null);

  // k:questionId, v:userAnswers
  const userAnswers = ref<Record<number, number[]>>({});
  const submittedIds = ref<Record<number, boolean>>({});

  const details = computed<RecordBucketDetails>(() => ({
    currentIndex: currentIndex.value,
    userAnswers: userAnswers.value,
    submittedIds: submittedIds.value,
  }));

  function resetStore(store?: Partial<RecordStores>) {
    currentIndex.value = store?.currentIndex ?? 0;
    recordId.value = store?.recordId ?? null;
    bucketId.value = store?.bucketId ?? null;
    userAnswers.value = store?.userAnswers ?? {};
    submittedIds.value = store?.submittedIds ?? {};
  }

  async function newOne(bId: string) {
    resetStore();

    const { data, error } = await recordInsert(bId, details.value);
    console.log({ data, error });
    if (error) throw error;

    bucketId.value = bId;
    recordId.value = data.id;
  }

  async function oldOne(details: RecordBucketDetails) {
    resetStore({
      currentIndex: details.currentIndex,
      userAnswers: details.userAnswers,
      submittedIds: details.submittedIds,
    });
  }

  async function syncDb() {
    if (!recordId.value) return;
    await recordUpsert(recordId.value, details.value);
  }

  async function saveAnswer(id: number, indices: number[], submitted = false) {
    userAnswers.value[id] = indices;
    if (submitted) submittedIds.value[id] = true;

    await syncDb();
  }

  async function resetAnswer(id: number) {
    delete userAnswers.value[id];
    delete submittedIds.value[id];
  }

  return {
    currentIndex,
    userAnswers,
    submittedIds,
    newOne,
    oldOne,
    saveAnswer,
    resetAnswer,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRecordStore, import.meta.hot));
}
