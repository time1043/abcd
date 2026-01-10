import type { RecordBucket } from "@/types/record";

export const useRecordStore = defineStore("record", () => {
  const records = ref<RecordBucket | null>(null);

  async function setRecord() {
    // records.value = null;
  }

  return { records, setRecord };
});
