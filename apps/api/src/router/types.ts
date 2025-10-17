import type { User } from "@prisma/client";
import type { Repository } from "../repository/types";

export interface Env {
  Bindings: {
    BASE_URL: string;
    DATABASE_URL: string;
    ALLOWED_DISCORD_SERVER_ID: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
  };
  Variables: {
    repo: Repository;
  };
}

export interface AuthRequiredEnv {
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    repo: Repository;
    user: User;
  };
}
