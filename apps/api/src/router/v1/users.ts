import { zValidator } from "@hono/zod-validator";
import { GetUserPostListQuerySchema } from "@repo/schema/post";
import { Hono } from "hono";
import { StatusOK } from "@/lib/statusCode";
import type { AuthRequiredEnv } from "../types";

const me = new Hono<AuthRequiredEnv>()
  .get("/", async (c) => {
    return c.json({ user: c.var.user }, StatusOK);
  })
  .get("/posts", zValidator("query", GetUserPostListQuerySchema), async (c) => {
    const { page, perPage } = c.req.valid("query");

    const [posts, totalCount] = await Promise.all([
      c.var.repo.post.getUserAllPosts(c.var.user.id, page, perPage),
      c.var.repo.post.getUserPostCount(c.var.user.id),
    ]);

    return c.json({ posts, totalCount }, StatusOK);
  });

export const usersWithAuth = new Hono<AuthRequiredEnv>().route("/@me", me);
