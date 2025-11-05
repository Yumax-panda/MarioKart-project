import { z } from "zod";
import { DatetimeLikeStringSchema } from "./utils";

const ArticleSchema = z.string().trim().max(50000);
const TitleSchema = z.string().trim().max(255);
const ThumbnailSchema = z.url().trim();
const TagsSchema = z.array(z.string().trim().max(15)).max(5);

const BasePostSchema = z.object({
  id: z.string(),
  userId: z.string(),
  tags: TagsSchema,
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

const UpdatePublishedPostBodySchema = z.object({
  article: ArticleSchema,
  title: TitleSchema,
  thumbnail: ThumbnailSchema,
  published: z.literal(true),
});

const UpdateNotPublishedPostBodySchema = z.object({
  article: ArticleSchema.optional(),
  title: TitleSchema.optional(),
  thumbnail: ThumbnailSchema.optional(),
  published: z.literal(false),
});

export const UpdatePostBodySchema = z.discriminatedUnion("published", [
  UpdatePublishedPostBodySchema,
  UpdateNotPublishedPostBodySchema,
]);
