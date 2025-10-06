import { hc } from "hono/client";
import type { AppType } from "..";

// assign the client to a variable to calculate the type when compiling
const client = hc<AppType>("");
export type Client = typeof client;

// ref: https://uttk.dev/articles/hono-rpc-tips
export const getTypedClient = (...args: Parameters<typeof hc>): Client =>
  hc<AppType>(...args);
