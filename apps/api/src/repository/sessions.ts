import type { PrismaClient, Session } from "@prisma/client/edge";
import { inject, injectable } from "tsyringe";
import type { CreateSessionProps, SessionRepository } from "./types";

@injectable()
export class SessionRepositoryImpl implements SessionRepository {
  constructor(@inject("PrismaClient") private p: PrismaClient) {}

  async getBySessionToken(sessionToken: string): Promise<Session | null> {
    return await this.p.session.findUnique({ where: { sessionToken } });
  }

  async create(session: CreateSessionProps) {
    return await this.p.session.create({ data: session });
  }

  async deleteBySessionToken(sessionToken: string): Promise<Session | null> {
    try {
      return await this.p.session.delete({ where: { sessionToken } });
    } catch {
      return null;
    }
  }
}
