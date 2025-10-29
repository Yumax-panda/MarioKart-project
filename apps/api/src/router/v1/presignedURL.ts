import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { zValidator } from "@hono/zod-validator";
import { GeneratePresignedURLBodySchema } from "@repo/schema/presignedURL";
import { Hono } from "hono";
import { StatusOK } from "@/lib/statusCode";
import type { AuthRequiredEnv } from "../types";

const EXPIRES_IN = 60 * 3; // 3 min

export const presignedURL = new Hono<AuthRequiredEnv>().post(
  "/generate",
  zValidator("json", GeneratePresignedURLBodySchema),
  async (c) => {
    const s3Client = new S3Client({
      endpoint: `https://${c.env.S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      region: "apac",
      credentials: {
        accessKeyId: c.env.S3_ACCESS_KEY_ID,
        secretAccessKey: c.env.S3_ACCESS_KEY_SECRET,
      },
    });

    const { purpose, imageType, size } = c.req.valid("json");

    const fileId = crypto.randomUUID();
    const ext = imageType.split("/")[1]; // ex: 'image/png' -> 'png'
    const key = `users/${c.var.user.id}/post_images/${fileId}.${ext}`;

    switch (purpose) {
      case "uploadThumbnail": {
        const cmd = new PutObjectCommand({
          Bucket: c.env.S3_BUCKET_NAME,
          Key: key,
          ContentType: imageType,
          ContentLength: size,
        });

        const presignedURL = await getSignedUrl(s3Client, cmd, {
          expiresIn: EXPIRES_IN,
        });

        return c.json(
          {
            ok: true,
            presignedURL,
            fileName: key,
            fileURL: `${c.env.S3_FILE_BASE_URL}/${key}`,
          },
          StatusOK,
        );
      }
    }
  },
);
