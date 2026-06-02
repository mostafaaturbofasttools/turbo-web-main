export type SubmissionPayload = {
  type: "publish" | "contact";
  submittedAt: string;
  data: Record<string, string>;
};

export interface SubmissionStore {
  save(payload: SubmissionPayload): Promise<void>;
}

export async function saveSubmission(payload: SubmissionPayload): Promise<void> {
  const { createAzureSubmissionStore } = await import("@/lib/submissions/azure");
  const store = createAzureSubmissionStore();
  await store.save(payload);
}
