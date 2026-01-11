import { supabase } from "@/lib/supabase-client";
import type { QueryData } from "@supabase/supabase-js";

export const bucketsQuery = supabase
  .from("buckets")
  .select(`id, name`)
  .order("id", { ascending: true });
export type BuckersQuery = QueryData<typeof bucketsQuery>;

// export const bucketQuestionsQuery = (bucketId: number) =>
//   supabase
//     .from("bucket_questions")
//     .select(
//       `
//       sort_order,
//       questions (
//         id,
//         type,
//         title,
//         description,
//         choices,
//         answers
//       )
//     `
//     )
//     .eq("bucket_id", bucketId)
//     .order("sort_order", { ascending: true });
// export type BucketQuestionsQuery = QueryData<
//   ReturnType<typeof bucketQuestionsQuery>
// >;
export const bucketQuestionsQuery = (bucketId: string) =>
  supabase
    .from("bucket_questions_view")
    .select("id, description, choices, answers")
    .eq("bucket_id", bucketId)
    .order("id");
export type BucketQuestionsQuery = QueryData<
  ReturnType<typeof bucketQuestionsQuery>
>;
