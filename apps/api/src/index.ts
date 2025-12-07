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
import { router } from "@/router";
import type { Env } from "@/utils/types";

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
  .use(prettyJSON(), logger())
  .use(async (c, next) => {
    const startTime = Date.now();
    const method = c.req.method;
    const url = c.req.url;
    const path = c.req.path;

    console.log("=".repeat(80));
    console.log(`[${new Date().toISOString()}] ${method} ${path}`);
    console.log("-".repeat(80));
    console.log("Full URL:", url);

    const origin = c.req.header("origin");
    const referer = c.req.header("referer");
    console.log("\n[Origin Info]");
    console.log("Origin:", origin || "(not set)");
    console.log("Referer:", referer || "(not set)");

    console.log("\n[Headers]");
    const headers: Record<string, string> = {};
    c.req.raw.headers.forEach((value, key) => {
      headers[key] = value;
    });
    console.log(JSON.stringify(headers, null, 2));

    const query = c.req.query();
    if (Object.keys(query).length > 0) {
      console.log("\n[Query Parameters]");
      console.log(JSON.stringify(query, null, 2));
    }

    if (["POST", "PUT", "PATCH"].includes(method)) {
      try {
        const contentType = c.req.header("content-type");
        if (contentType?.includes("application/json")) {
          const body = await c.req.json();
          console.log("\n[Request Body]");
          console.log(JSON.stringify(body, null, 2));

          c.req.raw = new Request(c.req.raw, {
            body: JSON.stringify(body),
            headers: c.req.raw.headers,
          });
        }
      } catch (error) {
        console.log("\n[Request Body] Failed to parse:", error);
      }
    }

    console.log("=".repeat(80));

    await next();

    // レスポンス情報
    const duration = Date.now() - startTime;
    console.log(
      `[Response] ${method} ${path} - Status: ${c.res.status} - Duration: ${duration}ms`,
    );
    console.log("=".repeat(80));
  })
  .use(async (c, next) => {
    c.set("repo", repo);
    await next();
  })
  .use(
    cors({
      origin: [env.FRONTEND_BASE_URL],
      allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
      credentials: true,
    }),
  )
  .route("/api", router);

export type AppType = typeof app;

export default app;
