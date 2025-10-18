import type { PrismaClient, Session } from "@prisma/client/edge";
import { inject, injectable } from "tsyringe";
import type { CreateSessionProps, SessionRepository } from "./types";

// TODO:
@injectable()
export class SessionRepositoryImpl implements SessionRepository {
  constructor(@inject("PrismaClient") private p: PrismaClient) {}

  async getBySessionToken(sessionToken: string): Promise<Session | null> {
    return await this.p.session.findUnique({ where: { sessionToken } });
  }

  async create(session: CreateSessionProps) {
    return await this.p.session.create({ data: session });
  }
}
