import { createClient } from "@supabase/supabase-js";
import path from "path";

import { type Database, type TablesInsert } from "../src/types/supabase";
import { getQtPaths, readJson } from "./utils";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient<Database>(supabaseUrl!, supabaseServiceRoleKey!);

const seedDir = "./data/seed";
const qwaFile = "question-with-answer.json";

type problem_type = Database["public"]["Enums"]["problem_type"];

async function seedBuckets(qtPaths: string[]) {
  const bNames = Array.from(
    new Set(
      qtPaths.map((qtPath) => {
        const examDir = path.dirname(qtPath);
        const subjectDir = path.dirname(examDir);
        return `${path.basename(subjectDir)}/${path.basename(examDir)}`;
      })
    )
  );

  const bucketInserts: TablesInsert<"buckets">[] = bNames.map((name) => ({
    name,
  }));

  const { data, error } = await supabase
    .from("buckets")
    .upsert(bucketInserts, { onConflict: "name" })
    .select("id, name");
  if (error) throw new Error(`Seed Buckets Error: ${error.message}`);

  const map = new Map<string, string>();
  data.forEach((b) => map.set(b.name, b.id));
  return map;
}

async function seedQuestionsAndLinks(
  rawQuestions: any[],
  type: problem_type,
  bucketId: string,
  startOrder: number
) {
  let currentOrder = startOrder;

  for (const q of rawQuestions) {
    const questionInsert: TablesInsert<"questions"> = {
      type: type,
      title: q.title || null,
      description: q.description,
      choices: q.choices || null,
      answers: q.answers,
    };

    const { data: qData, error: qError } = await supabase
      .from("questions")
      .insert(questionInsert)
      .select("id")
      .single();
    if (qError) {
      console.error(`Failed to insert question: ${qError.message}`);
      continue;
    }

    const link: TablesInsert<"bucket_questions"> = {
      bucket_id: bucketId,
      question_id: qData.id,
      sort_order: currentOrder++,
    };

    const { error: lError } = await supabase
      .from("bucket_questions")
      .insert(link);
    if (lError)
      console.error(`Failed to link question ${qData.id}: ${lError.message}`);
  }

  return currentOrder;
}

async function main() {
  console.log("🚀 Starting seeding process...");

  const qtPaths = await getQtPaths(seedDir);
  const bucketMap = await seedBuckets(qtPaths);

  // { bucketId: currentSortOrder }
  const sortOrderCounters = new Map<string, number>();

  for (const qtPath of qtPaths) {
    const type = path.basename(qtPath) as problem_type;
    const examDir = path.dirname(qtPath);
    const subjectDir = path.dirname(examDir);
    const bucketName = `${path.basename(subjectDir)}/${path.basename(examDir)}`;

    const bucketId = bucketMap.get(bucketName);
    if (!bucketId) continue;
    console.log(`Processing [${bucketName}] - [${type}]`);

    const filePath = path.join(qtPath, qwaFile);
    const rawQuestions = await readJson(filePath);
    if (!rawQuestions || !Array.isArray(rawQuestions)) continue;

    const startOrder = sortOrderCounters.get(bucketId) || 1;
    const nextOrder = await seedQuestionsAndLinks(
      rawQuestions,
      type,
      bucketId,
      startOrder
    );
    sortOrderCounters.set(bucketId, nextOrder);
  }

  console.log("✅ All data seeded successfully!");
}

await main();
