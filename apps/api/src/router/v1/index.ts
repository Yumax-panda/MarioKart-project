import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { StatusUnauthorized } from "@/lib/statusCode";
import { KEY_SESSION_ID } from "../consts/cookie";
import type { Env } from "../types";
import { accounts } from "./accounts";
import { posts, postsWithAuth } from "./posts";
import { presignedURL } from "./presignedURL";
import { sessions } from "./sessions";
import { tags } from "./tags";
import { usersWithAuth } from "./users";

const v1WithAuth = new Hono<Env>()
  .use(async (c, next) => {
    const user = c.var.user;
    if (!user) {
      return c.text("You must be logged in.", StatusUnauthorized);
    }
    await next();
  })
  .route("/posts", postsWithAuth)
  .route("/users", usersWithAuth)
  .route("/presignedURL", presignedURL);

export const v1 = new Hono<Env>()
  .use(async (c, next) => {
    const sessionId = getCookie(c, KEY_SESSION_ID);
    c.set("user", null);

    if (sessionId) {
      const session = await c.var.repo.session.getBySessionToken(sessionId);
      if (session && session.expires >= new Date()) {
        const user = await c.var.repo.user.getById(session.userId);
        c.set("user", user);
      }
    }
    await next();
  })
  .route("/accounts", accounts)
  .route("/posts", posts)
  .route("/sessions", sessions)
  .route("/tags", tags)
  .route("/", v1WithAuth);
