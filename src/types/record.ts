export type UserAnswers = Record<number, number[]>;
export type SubmittedIds = Record<number, boolean>;

export type RecordBucketDetails = {
  currentIndex: number;
  userAnswers: UserAnswers;
  submittedIds: SubmittedIds;
};

// export type RecordBucket = {
//   id: string; // recordId
//   bucketId: string;
//   details: RecordBucketDetails;
// };

export type RecordStores = {
  currentIndex: number;
  recordId: string | null;
  bucketId: string | null;
  userAnswers: UserAnswers;
  submittedIds: SubmittedIds;
};
