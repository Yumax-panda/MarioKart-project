import type { AuthState } from "@prisma/client";

export interface AuthStateRepository {
  create(stateValue: string): Promise<AuthState>;
  get(stateId: string): Promise<AuthState | null>;
}
