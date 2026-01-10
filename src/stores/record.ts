import type { Record } from "@/types/record";

export const useRecordStore = defineStore("record", () => {
  const records = ref<Record | null>(null);

  async function setRecord() {
    // records.value = null;
  }

  return { records, setRecord };
});
