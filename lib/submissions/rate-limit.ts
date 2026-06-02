import { createHash } from "node:crypto";
import { azureBlobPath, getAzureContainer } from "@/lib/submissions/azure-storage";

const RATE_WINDOW_MS = 60_000;

/** Dev-only fallback when Azure is not configured locally */
const memoryRateLimit = new Map<string, number>();

function hashKey(key: string) {
  return createHash("sha256").update(key).digest("hex").slice(0, 32);
}

function checkMemoryRateLimit(key: string): boolean {
  const now = Date.now();
  const last = memoryRateLimit.get(key) ?? 0;
  if (now - last < RATE_WINDOW_MS) {
    return false;
  }
  memoryRateLimit.set(key, now);
  return true;
}

/**
 * Returns true if the request is allowed, false if rate limited.
 * Uses Azure Blob markers in production so limits survive serverless cold starts.
 */
export async function checkRateLimit(key: string): Promise<boolean> {
  const container = await getAzureContainer();

  if (!container) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[rate-limit] AZURE_STORAGE_CONNECTION_STRING not set — rate limit disabled");
      return true;
    }
    return checkMemoryRateLimit(key);
  }

  const blobName = azureBlobPath("rate-limit", `${hashKey(key)}.json`);
  const blob = container.getBlockBlobClient(blobName);
  const now = Date.now();

  try {
    const download = await blob.download(0);
    const chunks: Buffer[] = [];
    if (download.readableStreamBody) {
      for await (const chunk of download.readableStreamBody) {
        chunks.push(Buffer.from(chunk));
      }
    }
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8")) as { lastAt?: number };
    if (typeof parsed.lastAt === "number" && now - parsed.lastAt < RATE_WINDOW_MS) {
      return false;
    }
  } catch (error: unknown) {
    const statusCode = (error as { statusCode?: number }).statusCode;
    if (statusCode !== 404) {
      console.warn("[rate-limit] blob read failed:", error);
    }
  }

  const body = JSON.stringify({ lastAt: now });
  await blob.upload(body, Buffer.byteLength(body, "utf8"), {
    blobHTTPHeaders: { blobContentType: "application/json" },
  });

  return true;
}
