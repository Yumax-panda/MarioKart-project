import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono().use("*", prettyJSON(), logger()).get("/", (c) => {
  return c.text("Hello Hono!");
});

export type AppType = typeof app;

export default app;
