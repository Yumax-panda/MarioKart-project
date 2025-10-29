import type { User } from "@prisma/client";
import type { Repository } from "../repository/types";

type Bindings = Cloudflare.Env;

interface Variables {
  repo: Repository;
  user: User | null;
}

export interface Env {
  Bindings: Bindings;
  Variables: Variables;
}

interface AuthRequiredEnvVariables extends Variables {
  user: User;
}

export interface AuthRequiredEnv {
  Bindings: Bindings;
  Variables: AuthRequiredEnvVariables;
}
