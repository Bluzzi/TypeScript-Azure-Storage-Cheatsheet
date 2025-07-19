import { containerClient } from "./client-initialization";

const blobClient = containerClient.getBlockBlobClient("blob-name.txt");

const properties = await blobClient.getProperties();
if (!properties.contentLength) throw Error("File does not exists");

console.log(`Blob size: ${String(properties.contentLength)} bytes`);
