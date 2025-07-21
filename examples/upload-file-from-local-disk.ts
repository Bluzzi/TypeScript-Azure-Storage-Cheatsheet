import { containerClient } from "./client-initialization";
import { readFileSync, writeFileSync, createReadStream } from "node:fs";
import { join } from "node:path";

const blobClient = containerClient.getBlockBlobClient("blob-name.txt");

// Create local txt file with random UUID as content:
const localFile = join(import.meta.dirname, "local-data.txt");
writeFileSync(localFile, crypto.randomUUID(), "utf-8");

// Example without streaming:
await blobClient.uploadData(readFileSync(localFile));

// Example with streaming:
await blobClient.uploadStream(createReadStream(localFile));
