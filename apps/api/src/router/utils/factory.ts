import { createFactory } from "hono/factory";
import { getPrisma } from "../../lib/prismaClient";

type Env = {
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    prisma: ReturnType<typeof getPrisma>;
  };
};

const factory = createFactory<Env>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const prisma = getPrisma(c.env.DATABASE_URL);
      c.set("prisma", prisma);
      await next();
    });
  },
});

export const createApp = factory.createApp;
export const createMiddleware = factory.createMiddleware;
export const createHandlers = factory.createHandlers;
