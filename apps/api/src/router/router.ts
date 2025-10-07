import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { createApp } from "./utils/factory";

const app = createApp()
  .use("*", prettyJSON(), logger())
  .get("/", (c) => {
    return c.text("Hello Hono!");
  });

export type AppType = typeof app;

export default app;
