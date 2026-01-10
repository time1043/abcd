export type RecordQuestion = {
  id: number;
  userAnswers: string[];
};

export type RecordBucket = {
  bucketId: string;
  details: RecordQuestion[];
};
