import { Hono } from "hono";
import type { AuthRequiredEnv, Env } from "../types";

// TODO:
export const users = new Hono<Env>();

export const usersWithAuth = new Hono<AuthRequiredEnv>();
