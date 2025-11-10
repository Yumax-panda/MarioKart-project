import { z } from "zod";

const FILE_MAX_BYTE = 1024 * 1024 * 1024; // 1MB

export const GeneratePresignedURLBodySchema = z.object({
  purpose: z.enum(["uploadThumbnail"]),
  imageType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  size: z.number().max(FILE_MAX_BYTE),
});
