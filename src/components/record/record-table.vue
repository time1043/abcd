<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th v-for="col in columns" :key="col">{{ col }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(record, index) in data" :key="record.id">
          <th>{{ index + 1 }}</th>
          <td>{{ record.bucket?.name }}</td>
          <td>{{ record.score }}</td>
          <td>
            <span
              @click="
                onClick(
                  record.bucket?.id!,
                  record.details as RecordBucketDetails
                )
              "
              class="badge"
              :class="badgeClass(record.status as record_status)"
            >
              {{ record.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { bucketQuestionsQuery } from "@/pages/home/bucket/data";
import type { RecordsQuery } from "@/pages/home/record/data";
import type { Question } from "@/types/question";
import type { RecordBucketDetails } from "@/types/record";
import type { Database } from "@/types/supabase";

type record_status = Database["public"]["Enums"]["record_status"];

const columns = ["Bucket", "Score", "Status"];

const router = useRouter();

const props = defineProps<{
  data: RecordsQuery;
}>();

function badgeClass(status: record_status) {
  if (status === "IN_PROGRESS") return "badge-soft badge-primary";
  else return "badge-soft badge-neutral";
}

async function onClick(bucketId: string, details: RecordBucketDetails) {
  // const { data, error } = await bucketQuestionsQuery(bucketId);
  // console.log({ data, error });
  // if (error) throw error;
  // useRecordStore().oldOne(details, data as Question[]);
  useRecordStore().oldOne(details);
  router.push(`/home/bucket/${bucketId}`);
}
</script>

<style scoped></style>
