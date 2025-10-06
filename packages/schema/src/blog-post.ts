import { z } from "zod";
import { DatetimeLikeStringSchema } from "./utils";

export const thumbnailSchema = z.object({
  url: z.url(),
  title: z.string().max(255),
});

export const BlogPostSchema = z.discriminatedUnion("published", [
  z.object({
    id: z.string(),
    userId: z.string(),
    article: z.string().max(50000),
    title: z.string().max(255),
    thumbnail: thumbnailSchema,
    tags: z.array(z.string().max(50)),
    published: z.literal(true),
    createdAt: DatetimeLikeStringSchema,
    updatedAt: DatetimeLikeStringSchema,
  }),
  z.object({
    id: z.string(),
    userId: z.string(),
    article: z.string().max(50000).optional(),
    title: z.string().max(255).optional(),
    thumbnail: thumbnailSchema.optional(),
    tags: z.array(z.string().max(50)),
    published: z.literal(false),
    createdAt: DatetimeLikeStringSchema.optional(),
    updatedAt: DatetimeLikeStringSchema.optional(),
  }),
]);
