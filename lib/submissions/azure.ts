import type { SubmissionPayload, SubmissionStore } from "@/lib/submissions";
import { azureBlobPath, getAzureContainer } from "@/lib/submissions/azure-storage";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

export function createAzureSubmissionStore(): SubmissionStore {
  return {
    async save(payload: SubmissionPayload) {
      const container = await getAzureContainer();

      if (!container) {
        console.info("[submission] Azure not configured, logging only:", payload.type);
        return;
      }

      const idPart =
        payload.type === "contact"
          ? slugify(payload.data.name ?? "contact")
          : slugify(payload.data.appName ?? "app");
      const blobName = azureBlobPath("submissions", payload.type, `${Date.now()}-${idPart}.json`);

      const blockBlob = container.getBlockBlobClient(blobName);
      const body = JSON.stringify(payload, null, 2);
      await blockBlob.upload(body, Buffer.byteLength(body, "utf8"), {
        blobHTTPHeaders: { blobContentType: "application/json" },
      });
    },
  };
}
