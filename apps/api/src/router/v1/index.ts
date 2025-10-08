import { Hono } from "hono";
import { accounts } from "./accounts";
import { posts } from "./posts";
import { sessions } from "./sessions";
import { tags } from "./tags";
import { users } from "./users";

export const v1 = new Hono()
  .route("/accounts", accounts)
  .route("/posts", posts)
  .route("/sessions", sessions)
  .route("/tags", tags)
  .route("/users", users);
