import { zValidator } from "@hono/zod-validator";
import { GetPublishedPostListQuerySchema } from "@repo/schema/post";
import { Hono } from "hono";
import { StatusNotFound, StatusOK } from "@/lib/statusCode";
import type { AuthRequiredEnv, Env } from "../types";

// TODO:
export const posts = new Hono<Env>()
  .get("/", zValidator("query", GetPublishedPostListQuerySchema), async (c) => {
    const { page, perPage } = c.req.valid("query");

    const [posts, totalCount] = await Promise.all([
      c.var.repo.post.getPublishedPostList(page, perPage),
      c.var.repo.post.getPublishedPostCount(),
    ]);

    return c.json({ posts, totalCount }, StatusOK);
  })
  .get("/:postId", async (c) => {
    const postId = c.req.param("postId");
    const post = await c.var.repo.post.getDetailById(postId);

    if (post === null) {
      return c.json({ error: "Not Found" }, StatusNotFound);
    }

    if (!post.published && !(c.var.user && c.var.user.id === post.userId)) {
      return c.json({ error: "Not Found" }, StatusNotFound);
    }

    return c.json(post, 200);
  });

export const postsWithAuth = new Hono<AuthRequiredEnv>().post(
  "/create",
  async (c) => {
    const newPost = await c.var.repo.post.createOrGetEmpty(c.var.user.id);
    return c.json({ post: newPost }, StatusOK);
  },
);
