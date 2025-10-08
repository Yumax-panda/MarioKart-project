import type { Session } from "@prisma/client";

// TODO:
export interface SessionRepository {
  getBySessionToken(sessionToken: string): Promise<Session | null>;
}
