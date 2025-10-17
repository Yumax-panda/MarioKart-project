import { zValidator } from "@hono/zod-validator";
import { GetCallbackQuerySchema } from "@repo/schema/auth/discord";
import { Hono } from "hono";
import type { Env } from "../types";

export const discord = new Hono<Env>().get(
  "/",
  zValidator("query", GetCallbackQuerySchema),
  async (c) => {
    const { code, state } = c.req.valid("query");
  },
);
