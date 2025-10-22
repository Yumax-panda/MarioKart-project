import { z } from "zod";
import { DatetimeLikeStringSchema } from "./utils";

const ArticleSchema = z.string().max(50000);
const TitleSchema = z.string().max(255);
const ThumbnailSchema = z.url();

const BasePostSchema = z.object({
  id: z.string(),
  userId: z.string(),
  tags: z.array(z.string().max(50)),
  createdAt: DatetimeLikeStringSchema,
  updatedAt: DatetimeLikeStringSchema,
});

const PublishedPostSchema = BasePostSchema.extend({
  article: ArticleSchema,
  title: TitleSchema,
  thumbnail: ThumbnailSchema,
  published: z.literal(true),
});

const NotPublishedPostSchema = BasePostSchema.extend({
  article: ArticleSchema.optional(),
  title: TitleSchema.optional(),
  thumbnail: ThumbnailSchema.optional(),
  published: z.literal(false),
});

export const PostSchema = z.discriminatedUnion("published", [
  PublishedPostSchema,
  NotPublishedPostSchema,
]);

export type PublishedPostType = z.infer<typeof PublishedPostSchema>;
export type NotPublishedPostType = z.infer<typeof NotPublishedPostSchema>;
export type PostType = z.infer<typeof PostSchema>;

export const GetPublishedPostListQuerySchema = z.object({
  page: z.coerce.number().min(1),
  perPage: z.coerce.number().max(12),
});
