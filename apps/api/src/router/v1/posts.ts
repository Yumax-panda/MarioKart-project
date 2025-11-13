import { zValidator } from "@hono/zod-validator";
import { BusinessErrorCodes } from "@repo/schema/errorCodes";
import {
  GetPublishedPostListQuerySchema,
  UpdatePostBodySchema,
} from "@repo/schema/post";
import { Hono } from "hono";
import {
  createBusinessErrorResponse,
  createValidationErrorResponse,
} from "@/lib/errorResponse";
import {
  StatusForbidden,
  StatusNoContent,
  StatusNotFound,
  StatusOK,
  StatusUnprocessableEntity,
} from "@/lib/statusCode";
import type { AuthRequiredEnv, Env } from "../types";

// TODO:
export const posts = new Hono<Env>()
  .get("/", zValidator("query", GetPublishedPostListQuerySchema), async (c) => {
    const { page, perPage, userId } = c.req.valid("query");

    const [posts, totalCount] = await Promise.all([
      c.var.repo.post.getPublishedPostList(page, perPage, userId),
      c.var.repo.post.getPublishedPostCount(userId),
    ]);

    return c.json({ posts, totalCount }, StatusOK);
  })
  .get("/:postId", async (c) => {
    const postId = c.req.param("postId");
    const post = await c.var.repo.post.getDetailById(postId);

    if (post === null) {
      return c.json(
        createBusinessErrorResponse(BusinessErrorCodes.POST_NOT_FOUND),
        StatusNotFound,
      );
    }

    // Check if the post is completely empty (no title, article, or thumbnail)
    const isEmpty = !post.title && !post.article && !post.thumbnail;
    if (isEmpty) {
      return c.json(
        createBusinessErrorResponse(BusinessErrorCodes.POST_NOT_FOUND),
        StatusNotFound,
      );
    }

    if (!post.published && !(c.var.user && c.var.user.id === post.userId)) {
      return c.json(
        createBusinessErrorResponse(BusinessErrorCodes.POST_NOT_FOUND),
        StatusNotFound,
      );
    }

    return c.json(post, 200);
  });

export const postsWithAuth = new Hono<AuthRequiredEnv>()
  .post("/", async (c) => {
    const newPost = await c.var.repo.post.createOrGetEmpty(c.var.user.id);
    return c.json({ post: newPost }, StatusOK);
  })
  .patch(
    "/:postId",
    zValidator("json", UpdatePostBodySchema, (result, c) => {
      if (!result.success) {
        return c.json(
          createValidationErrorResponse(result.error),
          StatusUnprocessableEntity,
        );
      }
    }),
    async (c) => {
      const postId = c.req.param("postId");
      const post = await c.var.repo.post.getDetailById(postId);

      if (!post) {
        return c.json(
          createBusinessErrorResponse(BusinessErrorCodes.POST_NOT_FOUND),
          StatusNotFound,
        );
      }

      if (post.userId !== c.var.user.id) {
        return c.json(
          createBusinessErrorResponse(BusinessErrorCodes.POST_FORBIDDEN),
          StatusForbidden,
        );
      }

      const data = c.req.valid("json");
      await c.var.repo.post.update({ id: postId, ...data });
      return c.body(null, StatusNoContent);
    },
  );
