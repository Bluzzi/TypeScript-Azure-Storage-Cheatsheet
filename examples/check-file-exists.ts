import { containerClient } from "./client-initialization";

const blobClient = containerClient.getBlockBlobClient("blob-name.txt");
const exists = await blobClient.exists();

console.log(exists);
