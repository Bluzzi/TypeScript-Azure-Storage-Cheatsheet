import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

if (process.env.AZURE_STORAGE_ACCOUNT === undefined) throw new Error("AZURE_STORAGE_ACCOUNT env variable isn't defined");
if (process.env.AZURE_STORAGE_ACCOUNT_KEY === undefined) throw new Error("AZURE_STORAGE_ACCOUNT_KEY env variable isn't defined");
if (process.env.AZURE_STORAGE_CONTAINER_NAME === undefined) throw new Error("AZURE_STORAGE_CONTAINER_NAME env variable isn't defined");

export const clientAzureStorage = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
  new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT,
    process.env.AZURE_STORAGE_ACCOUNT_KEY,
  ),
);

export const containerClient = clientAzureStorage.getContainerClient(
  process.env.AZURE_STORAGE_CONTAINER_NAME,
);

export { BlobSASPermissions } from "@azure/storage-blob";
