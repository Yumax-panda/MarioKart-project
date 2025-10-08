import "reflect-metadata";
import { container } from "tsyringe";
import { getPrisma } from "./lib/prismaClient";
import {
  AccountRepositoryImpl,
  PostRepositoryImpl,
  RepositoryImpl,
  SessionRepositoryImpl,
  TagRepositoryImpl,
  UserRepositoryImpl,
} from "./repository";
import type {
  AccountRepository,
  PostRepository,
  Repository,
  SessionRepository,
  TagRepository,
  UserRepository,
} from "./repository/types";
import { app } from "./router/router";

app.use("*", async (c, next) => {
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
});

export default app;
