import { Hono } from "hono";
import type { Env } from "../types";

// TODO:
export const posts = new Hono<Env>().get("/:postId", async (c) => {
  const postId = c.req.param("postId");
  const post = await c.var.repo.post.getById(postId);

  if (post === null) {
    return c.json({ error: "Not Found" }, 404);
  }

  return c.json(post, 200);
});
