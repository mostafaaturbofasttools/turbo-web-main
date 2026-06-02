import { BlobServiceClient } from "@azure/storage-blob";
import type { SubmissionPayload, SubmissionStore } from "@/lib/submissions";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

export function createAzureSubmissionStore(): SubmissionStore {
  return {
    async save(payload: SubmissionPayload) {
      const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
      const containerName = process.env.AZURE_SUBMISSIONS_CONTAINER ?? "app-submissions";

      if (!connectionString) {
        console.info("[submission] Azure not configured, logging only:", payload.type);
        return;
      }

      const client = BlobServiceClient.fromConnectionString(connectionString);
      const container = client.getContainerClient(containerName);
      await container.createIfNotExists();

      const idPart =
        payload.type === "publish"
          ? slugify(payload.data.appName ?? "app")
          : slugify(payload.data.name ?? "contact");
      const blobName = `${payload.type}/${Date.now()}-${idPart}.json`;

      const blockBlob = container.getBlockBlobClient(blobName);
      const body = JSON.stringify(payload, null, 2);
      await blockBlob.upload(body, Buffer.byteLength(body, "utf8"), {
        blobHTTPHeaders: { blobContentType: "application/json" },
      });
    },
  };
}
