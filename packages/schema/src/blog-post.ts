import { z } from "zod";
import { DatetimeLikeStringSchema } from "./utils";

export const thumbnailSchema = z.object({
  url: z.url(),
  title: z.string().max(255),
});

export const BlogPostSchema = z.discriminatedUnion("published", [
  z.object({
    id: z.string(),
    article: z.string().max(50000),
    createdAt: DatetimeLikeStringSchema,
    updatedAt: DatetimeLikeStringSchema,
    title: z.string().max(255),
    slug: z
      .string()
      .max(255)
      .regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
    tags: z.array(z.string().max(50)),
    thumbnail: thumbnailSchema,
    published: z.literal(true),
  }),
  z.object({
    id: z.string(),
    article: z.string().max(50000).optional(),
    createdAt: DatetimeLikeStringSchema.optional(),
    updatedAt: DatetimeLikeStringSchema.optional(),
    title: z.string().max(255).optional(),
    slug: z
      .string()
      .max(255)
      .regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)
      .optional(),
    tags: z.array(z.string().max(50)),
    thumbnail: thumbnailSchema.optional(),
    published: z.literal(false),
  }),
]);
