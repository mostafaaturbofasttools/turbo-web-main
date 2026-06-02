import { BlobServiceClient, type ContainerClient } from "@azure/storage-blob";

const DEFAULT_PREFIX = "turbo-web";
const DEFAULT_CONTAINER = "app-submissions";

/** Top-level folder in the blob container (e.g. turbo-web/submissions/...) */
export function getAzureStoragePrefix(): string {
  return (process.env.AZURE_STORAGE_PREFIX ?? DEFAULT_PREFIX).replace(/^\/+|\/+$/g, "");
}

export function azureBlobPath(...segments: string[]): string {
  const prefix = getAzureStoragePrefix();
  const path = segments.filter(Boolean).join("/");
  return path ? `${prefix}/${path}` : prefix;
}

export async function getAzureContainer(): Promise<ContainerClient | null> {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_SUBMISSIONS_CONTAINER ?? DEFAULT_CONTAINER;
  if (!connectionString) return null;

  const client = BlobServiceClient.fromConnectionString(connectionString);
  const container = client.getContainerClient(containerName);
  await container.createIfNotExists();
  return container;
}
