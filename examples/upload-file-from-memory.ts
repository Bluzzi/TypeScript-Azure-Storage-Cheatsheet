import { containerClient } from "./client-initialization";
import { Readable } from "node:stream";

const blockBlobClient = containerClient.getBlockBlobClient("blob-name.txt");

// Example without streaming:
await blockBlobClient.uploadData(Buffer.from("Hello, World!"));

// Example with streaming (simple):
await blockBlobClient.uploadStream(Readable.from(Buffer.from("Hello, World!")));

// Example with streaming (more realistic but still not totally):
const liveStream = new Readable({
  read() {
    for (let i = 0; i < 10; i += 1) {
      this.push(`Chunk ${String(i)}: Hello, World!\n`);
    }

    this.push(null); // end signal
  },
});

await blockBlobClient.uploadStream(liveStream);
