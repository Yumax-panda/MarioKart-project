import { hc } from "hono/client";
import type { AppType } from "..";

export type Client = ReturnType<typeof hc<AppType>>;

export const getTypedClient = (...args: Parameters<typeof hc>): Client =>
  hc<AppType>(...args);
