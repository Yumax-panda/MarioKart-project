import { Hono } from "hono";
import { StatusOK } from "@/lib/statusCode";
import type { AuthRequiredEnv, Env } from "../types";

// TODO:
export const users = new Hono<Env>();

export const usersWithAuth = new Hono<AuthRequiredEnv>().get(
  "/@me",
  async (c) => {
    return c.json({ user: c.var.user }, StatusOK);
  },
);
