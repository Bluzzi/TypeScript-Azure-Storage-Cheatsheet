import { containerClient } from "./client-initialization";
import { Readable } from "node:stream";

const blockBlobClient = containerClient.getBlockBlobClient("blob-name.svg");

// Example without streaming:
const imageResponse = await fetch("https://placehold.co/400");
const imageBuffer = await imageResponse.arrayBuffer();

await blockBlobClient.uploadData(imageBuffer);

// Example with streaming:
const response = await fetch("https://placehold.co/400");
if (!response.body) throw Error("Response does not have valid body");

await blockBlobClient.uploadStream(Readable.fromWeb(response.body));
