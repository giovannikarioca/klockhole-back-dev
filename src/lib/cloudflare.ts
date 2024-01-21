import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../env";

export const R2 = new S3Client({
  endpoint: env.CLOUDFLARE_ENDPOINT,
  region: "auto",
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});
