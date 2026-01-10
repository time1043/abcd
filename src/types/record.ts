export type RecordQuestion = {
  id: number;
  answers: string[];
};

export type RecordBucket = {
  bucketId: string;
  details: RecordQuestion[];
};
