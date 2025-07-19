# TypeScript Azure Storage (Blob) Cheatsheet
This repo contains several examples of using Azure Storage (Blob) with TypeScript and the `@azure/storage-blob` package.

Various examples of file uploads using different methods (from a URL, memory or a local file) are available, each with a synchronous and an asynchronous version.

## Blob Types
Azure Blob Storage supports three primary blob types, each tailored for specific use cases:

1. Block Blob
  - Description: Composed of blocks of data, it is the most common type used for storing files.
  - Use Cases: Ideal for documents, images, videos, backups, and large binary files.
  - Features: Supports parallel upload and optimized updates by managing blocks individually.
2. Append Blob
  - Description: Similar to block blobs but optimized for append operations, where data is appended to the end.
  - Use Cases: Suitable for logging scenarios where append operations ensure data order, such as telemetry or real-time logging.
  - Features: Data can only be added to the end, ensuring sequential write operations.
3. Page Blob
  - Description: Composed of fixed-size pages (512 bytes) optimized for frequent random read/write operations.
  - Use Cases: Used for scenarios requiring random access to small data segments, like Azure VM disks (VHDs).
  - Features: Provides low-latency access, ideal for virtual disks and applications requiring direct access to specific blob sections.

In this repository, we'll be concentrating on the use of Block Blob, but PRs are welcome if you'd like to add other examples for other types.

## Client initialization
Each example will use a `ContainerClient`, created from a `BlobServiceClient`, here's how they are initialized:
```ts
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

export const clientAzureStorage = new BlobServiceClient(
  `https://${env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
  new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT,
    process.env.AZURE_STORAGE_ACCOUNT_KEY,
  ),
);

const containerClient = clientAzureStorage.getContainerClient(
	process.env.AZURE_STORAGE_CONTAINER_NAME
);
```

So we use a `StorageSharedKeyCredential` to handle authentication, but you can use any Azure authentication method you like.

## Examples
- [Client Initialization](./examples/client-initialization.ts)
- [Upload a File via URL](./examples/upload-file-from-url.ts)
- [Upload a File from Memory](./examples/upload-file-from-memory.ts)
- [Upload a File from Local Disk](./examples/upload-file-from-local-disk.ts)
- [Download a File Locally](./examples/download-file-locally.ts)
- [Generate a "Signed URL" for Viewing a File (with GET HTTP request)](./examples/generate-viewing-file-url.ts)
- [Generate a "Signed URL" for Uploading a File (with PUT HTTP request)](./examples/generate-uploading-file-url.ts)
- [Retrieve File Size](./examples/retrieve-file-size.ts)
- [Delete a File](./examples/delete-file.ts)
- [Copy-Cut and Paste a File](./examples/copy-cut-paste-file.ts)