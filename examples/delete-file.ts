import { containerClient } from "./client-initialization";

const blobClient = containerClient.getBlockBlobClient("blob-name.txt");
await blobClient.delete();
