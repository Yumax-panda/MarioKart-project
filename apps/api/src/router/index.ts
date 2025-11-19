import { Hono } from "hono";
import type { Env } from "@/utils/types";
import { auth } from "./auth";
import { v1 } from "./v1";

export const router = new Hono<Env>().route("/v1", v1).route("/auth", auth);
