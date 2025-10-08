import "reflect-metadata";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { container } from "tsyringe";
import { getPrisma } from ".././lib/prismaClient";
import {
  AccountRepositoryImpl,
  PostRepositoryImpl,
  RepositoryImpl,
  SessionRepositoryImpl,
  TagRepositoryImpl,
  UserRepositoryImpl,
} from "../repository";
import type {
  AccountRepository,
  PostRepository,
  Repository,
  SessionRepository,
  TagRepository,
  UserRepository,
} from "./../repository/types";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    repo: Repository;
  };
}>()
  .use("*", prettyJSON(), logger())
  .use(async (c, next) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    container.registerInstance("PrismaClient", prisma);

    container.registerSingleton<AccountRepository>(
      "AccountRepository",
      AccountRepositoryImpl,
    );
    container.registerSingleton<PostRepository>(
      "PostRepository",
      PostRepositoryImpl,
    );
    container.registerSingleton<SessionRepository>(
      "SessionRepository",
      SessionRepositoryImpl,
    );
    container.registerSingleton<TagRepository>(
      "TagRepository",
      TagRepositoryImpl,
    );
    container.registerSingleton<UserRepository>(
      "UserRepository",
      UserRepositoryImpl,
    );

    container.registerSingleton<Repository>("Repository", RepositoryImpl);

    const repo = container.resolve<Repository>("Repository");

    c.set("repo", repo);
    await next();
  })
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/user/:id", async (c) => {
    return c.json(await c.var.repo.user.getById(c.req.param("id")));
  });

export type AppType = typeof app;

export default app;
