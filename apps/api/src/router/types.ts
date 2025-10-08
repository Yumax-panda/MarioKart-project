import type { Repository } from "../repository/types";

export interface Env {
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    repo: Repository;
  };
}
