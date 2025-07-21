import { containerClient } from "./client-initialization";
import { BlobSASPermissions } from "@azure/storage-blob";
import dayjs from "dayjs";

// Create signed URL:
const blobClient = containerClient.getBlockBlobClient("blob-name.txt");

const signedURL = await blobClient.generateSasUrl({
  permissions: BlobSASPermissions.from({ create: true, write: true }),
  expiresOn: dayjs().add(1, "hour").toDate(),
});

// Upload request example:
await fetch(signedURL, {
  method: "PUT",
  headers: { "x-ms-blob-type": "BlockBlob" },

  // You can also use a `File` instance directly for front-end use cases: https://stackoverflow.com/a/33855825
  body: new Blob(["Hello, Azure Blob!"]),
});
