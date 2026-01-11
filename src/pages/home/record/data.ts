import { supabase } from "@/lib/supabase-client";
import type { RecordBucketDetails } from "@/types/record";
import type { QueryData } from "@supabase/supabase-js";

export const recordInsert = (bucketId: string, details: RecordBucketDetails) =>
  supabase
    .from("records")
    .insert({
      user_id: useAccountStore().user?.id,
      bucket_id: bucketId,
      details,
    })
    .select("id")
    .single();

export const recordUpsert = (id: string, details: RecordBucketDetails) =>
  supabase
    .from("records")
    .upsert({ id, user_id: useAccountStore().user?.id, details });

export const recordsQuery = () =>
  supabase
    .from("records")
    .select(`id, bucket: buckets (id, name), score, status, details`)
    .eq("user_id", useAccountStore().user?.id!);
export type RecordsQuery = QueryData<ReturnType<typeof recordsQuery>>;

// export const recordQuery = (id: string) =>
//   supabase
//     .from("records")
//     .select(`id, bucket_id, score, details`)
//     .eq("user_id", useAccountStore().user?.id!)
//     .eq("id", id)
//     .single();
// export type RecordQuery = QueryData<ReturnType<typeof recordQuery>>;
