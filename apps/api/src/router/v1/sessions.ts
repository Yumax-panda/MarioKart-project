import { Hono } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";
import { StatusUnauthorized } from "@/lib/statusCode";
import type { Env } from "@/utils/types";
import { KEY_SESSION_ID } from "../consts/cookie";

export const sessions = new Hono<Env>().get("/logout", async (c) => {
  const sessionToken = getCookie(c, KEY_SESSION_ID);

  if (!sessionToken) {
    return c.json({ error: "No session found." }, StatusUnauthorized);
  }

  await c.var.repo.session.deleteBySessionToken(sessionToken);

  deleteCookie(c, KEY_SESSION_ID);

  return c.redirect(c.env.FRONTEND_BASE_URL);
});
