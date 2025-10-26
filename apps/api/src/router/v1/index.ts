import { Hono } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";
import {
  StatusInternalServerError,
  StatusUnauthorized,
} from "@/lib/statusCode";
import { KEY_SESSION_ID } from "../consts/cookie";
import type { AuthRequiredEnv, Env } from "../types";
import { accounts } from "./accounts";
import { posts } from "./posts";
import { presignedURL } from "./presignedURL";
import { sessions } from "./sessions";
import { tags } from "./tags";
import { users, usersWithAuth } from "./users";

const v1WithAuth = new Hono<AuthRequiredEnv>()
  .use(async (c, next) => {
    const sessionId = getCookie(c, KEY_SESSION_ID);

    if (!sessionId) {
      return c.text("Internal server error", StatusInternalServerError);
    }

    const session = await c.var.repo.session.getBySessionToken(sessionId);

    if (!session) {
      return c.text("You are not logged in", StatusUnauthorized);
    }

    if (session.expires < new Date()) {
      deleteCookie(c, KEY_SESSION_ID);
      return c.text("Session is expired.", StatusUnauthorized);
    }

    const user = await c.var.repo.user.getById(session.userId);

    if (!user) {
      return c.text("Internal server error", StatusInternalServerError);
    }

    c.set("user", user);
    await next();
  })
  .route("/users", usersWithAuth)
  .route("/presignedURL", presignedURL);

export const v1 = new Hono<Env>()
  .route("/accounts", accounts)
  .route("/posts", posts)
  .route("/sessions", sessions)
  .route("/tags", tags)
  .route("/users", users)
  .route("/", v1WithAuth);
