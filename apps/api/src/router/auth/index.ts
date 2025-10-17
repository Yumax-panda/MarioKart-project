import { Hono } from "hono";
import { discord } from "./discord";

export const auth = new Hono().basePath("/callback").route("/discord", discord);
