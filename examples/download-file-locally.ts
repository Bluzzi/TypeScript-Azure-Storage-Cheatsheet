import { containerClient } from "./client-initialization";
import { writeFileSync } from "node:fs";
import { createWriteStream } from "node:fs";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";

const blobClient = containerClient.getBlockBlobClient("blob-name.svg");

// Example without streaming:
const downloadResponse1 = await blobClient.downloadToBuffer();
writeFileSync(join(import.meta.dirname, "local-name.svg"), downloadResponse1);

// Example with streaming (alternative #1):
const downloadResponse2 = await blobClient.download();

if (!downloadResponse2.readableStreamBody) throw Error("No readable stream");
downloadResponse2.readableStreamBody.pipe(
  createWriteStream(join(import.meta.dirname, "local-name.svg")),
);

// Example with streaming (alternative #2):
const downloadResponse3 = await blobClient.download();

if (!downloadResponse3.readableStreamBody) throw Error("No readable stream");
await pipeline(
  downloadResponse3.readableStreamBody,
  createWriteStream(join(import.meta.dirname, "local-name.svg")),
);
