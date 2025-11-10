import type { Session } from "@prisma/client";

export type CreateSessionProps = Omit<Session, "createdAt" | "updatedAt">;

// TODO:
export interface SessionRepository {
  create(session: CreateSessionProps): Promise<Session>;
  getBySessionToken(sessionToken: string): Promise<Session | null>;
  deleteBySessionToken(sessionToken: string): Promise<Session | null>;
}
