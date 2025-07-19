import { containerClient } from "./client-initialization";
import { BlobSASPermissions } from "@azure/storage-blob";
import dayjs from "dayjs";

// Create signed URL:
const blobClient = containerClient.getBlockBlobClient("blob-name.txt");

const signedURL = await blobClient.generateSasUrl({
  permissions: BlobSASPermissions.from({ create: true, write: true }),
  expiresOn: dayjs().add(1, "hour").toDate(),
});

// Upload with FormData (to simulate a use case from a browser receiving the signed URL from backend):
const formData = new FormData();
formData.append("file", new Blob(["Hello, Azure Blob!"], { type: "text/plain" }));

await fetch(signedURL, {
  method: "PUT",
  headers: { "x-ms-blob-type": "BlockBlob" },
  body: formData.get("file"),
});
