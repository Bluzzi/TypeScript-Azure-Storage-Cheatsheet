import { clientAzureStorage } from "./client-initialization";

/**
 * @see {@link https://learn.microsoft.com/fr-fr/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services}
 *
 * It is required to use "Signed URL" in browser environment.
 */

const serviceProperties = await clientAzureStorage.getProperties();

serviceProperties.cors = [
  {
    allowedOrigins: "*",
    allowedMethods: "GET,PUT",
    allowedHeaders: "x-ms-*,content-type",
    exposedHeaders: "x-ms-meta-*",
    maxAgeInSeconds: 3600,
  },
];

await clientAzureStorage.setProperties(serviceProperties);
