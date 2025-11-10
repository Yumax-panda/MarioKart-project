import { Hono } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";
import { StatusNoContent, StatusUnauthorized } from "@/lib/statusCode";
import { KEY_SESSION_ID } from "../consts/cookie";
import type { Env } from "../types";

export const sessions = new Hono<Env>().delete("/logout", async (c) => {
  const sessionToken = getCookie(c, KEY_SESSION_ID);

  if (!sessionToken) {
    return c.json({ error: "No session found." }, StatusUnauthorized);
  }

  await c.var.repo.session.deleteBySessionToken(sessionToken);

  deleteCookie(c, KEY_SESSION_ID);

  return c.body(null, StatusNoContent);
});
