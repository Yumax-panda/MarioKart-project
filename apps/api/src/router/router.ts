import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import type { Repository } from "../repository/types";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    repo: Repository;
  };
}>()
  .use("*", prettyJSON(), logger())
  .get("/", (c) => {
    return c.text("Hello Hono!");
  });

export type AppType = typeof app;
