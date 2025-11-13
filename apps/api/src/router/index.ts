import "reflect-metadata";
import { env } from "cloudflare:workers";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { container } from "tsyringe";
import { getPrisma } from "@/lib/prismaClient";
import {
  AccountRepositoryImpl,
  AuthStateRepositoryImpl,
  PostRepositoryImpl,
  RepositoryImpl,
  SessionRepositoryImpl,
  TagRepositoryImpl,
  UserRepositoryImpl,
} from "@/repository";
import type {
  AccountRepository,
  AuthStateRepository,
  PostRepository,
  Repository,
  SessionRepository,
  TagRepository,
  UserRepository,
} from "@/repository/types";
import { auth } from "./auth";
import type { Env } from "./types";
import { v1 } from "./v1";

// 先にインスタンスを作成しておいて、ミドルウェアが呼ばれたときにはrepoを入れるだけにする
// TODO: env.ENV_NAMEによってrepoをmockされたものへ変更したい
const prisma = getPrisma(env.DATABASE_URL);
container.registerInstance("PrismaClient", prisma);
container.registerSingleton<AccountRepository>(
  "AccountRepository",
  AccountRepositoryImpl,
);
container.registerSingleton<AuthStateRepository>(
  "AuthStateRepository",
  AuthStateRepositoryImpl,
);
container.registerSingleton<PostRepository>(
  "PostRepository",
  PostRepositoryImpl,
);
container.registerSingleton<SessionRepository>(
  "SessionRepository",
  SessionRepositoryImpl,
);
container.registerSingleton<TagRepository>("TagRepository", TagRepositoryImpl);
container.registerSingleton<UserRepository>(
  "UserRepository",
  UserRepositoryImpl,
);
container.registerSingleton<Repository>("Repository", RepositoryImpl);
const repo = container.resolve<Repository>("Repository");

const app = new Hono<Env>()
  .basePath("/api")
  .use(prettyJSON(), logger())
  .use(async (c, next) => {
    c.set("repo", repo);
    await next();
  })
  .use(async (c, next) => {
    return cors({
      origin: [c.env.FRONTEND_BASE_URL],
      allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
      credentials: true,
    })(c, next);
  })
  .route("/v1", v1)
  .route("/auth", auth);

export type AppType = typeof app;

export default app;
