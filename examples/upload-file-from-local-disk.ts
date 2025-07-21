import { containerClient } from "./client-initialization";
import { readFileSync, writeFileSync, createReadStream } from "node:fs";
import { join } from "node:path";
import { PassThrough } from "node:stream";

const blobClient = containerClient.getBlockBlobClient("blob-name.txt");

// Create local txt file with random UUID as content:
const localFile = join(import.meta.dirname, "local-data.txt");
writeFileSync(localFile, crypto.randomUUID(), "utf-8");

// Example without streaming:
await blobClient.uploadData(readFileSync(localFile));

// Example with streaming:
await blobClient.uploadStream(createReadStream(localFile));

// Example with PassThrough streaming:
// Useful when dealing with streams from external sources or multipart uploads.
// PassThrough allows for stream manipulation or monitoring without modifying the data.
// It's a common workaround when direct piping isn't feasible due to source constraints.
const fileStream = createReadStream(localFile);
const passThroughStream = new PassThrough();

fileStream.pipe(passThroughStream);
await blobClient.uploadStream(passThroughStream);
