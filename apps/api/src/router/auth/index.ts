import { Hono } from "hono";
import { discord } from "./discord";

export const auth = new Hono().route("/discord", discord);
