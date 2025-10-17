import type { User } from "@prisma/client";
import type { Repository } from "../repository/types";

export interface Env {
  Bindings: {
    DATABASE_URL: string;
    ALLOWED_DISCORD_SERVER_ID: string;
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
