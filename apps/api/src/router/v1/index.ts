import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import {
  StatusInternalServerError,
  StatusUnauthorized,
} from "@/lib/statusCode";
import type { AuthRequiredEnv, Env } from "../types";
import { accounts } from "./accounts";
import { posts } from "./posts";
import { sessions } from "./sessions";
import { tags } from "./tags";
import { users, usersWithAuth } from "./users";

export const v1 = new Hono<Env>()
  .route("/accounts", accounts)
  .route("/posts", posts)
  .route("/sessions", sessions)
  .route("/tags", tags)
  .route("/users", users);

export const v1WithAuth = new Hono<AuthRequiredEnv>()
  .use(async (c, next) => {
    const sessionId = getCookie(c, "session_id");

    if (!sessionId) {
      return c.text("Internal server error", StatusInternalServerError);
    }

    const session = await c.var.repo.session.getBySessionToken(sessionId);

    if (!session) {
      return c.text("You are not logged in", StatusUnauthorized);
    }

    const user = await c.var.repo.user.getById(session.userId);

    if (!user) {
      return c.text("Internal server error", StatusInternalServerError);
    }

    c.set("user", user);
    await next();
  })
  .route("/users", usersWithAuth);
