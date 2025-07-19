import { containerClient } from "./client-initialization";
import { BlobSASPermissions } from "@azure/storage-blob";
import dayjs from "dayjs";

const blobClient = containerClient.getBlockBlobClient("blob-name.svg");

const signedURL = await blobClient.generateSasUrl({
  permissions: BlobSASPermissions.from({ read: true }),
  expiresOn: dayjs().add(1, "hour").toDate(),
});

console.log(signedURL);
