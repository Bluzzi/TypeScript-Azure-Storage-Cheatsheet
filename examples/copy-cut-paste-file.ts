import { containerClient } from "./client-initialization";

const oldBlobClient = containerClient.getBlockBlobClient("blob-name.svg");
const newBlobClient = containerClient.getBlockBlobClient("blob-name-2.svg");

const copyPoller = await newBlobClient.beginCopyFromURL(oldBlobClient.url);
await copyPoller.pollUntilDone();

// For cut/paste, don't forgot to delete the old blob:
// await oldBlobClient.delete();
