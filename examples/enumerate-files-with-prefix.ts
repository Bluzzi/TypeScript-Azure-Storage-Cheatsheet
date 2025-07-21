import { containerClient } from "./client-initialization";

const prefix = "static-prefix/"; // Static prefix for demonstration
const blobsForPrefix = containerClient.listBlobsFlat({ prefix });

for await (const blob of blobsForPrefix) {
  console.log(`Blob found: ${blob.name}`);
}
