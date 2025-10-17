import type { PrismaClient } from "@prisma/client/edge";
import { inject, injectable } from "tsyringe";
import type { AuthStateRepository } from "./types";

// TODO:
@injectable()
export class AuthStateRepositoryImpl implements AuthStateRepository {
  constructor(@inject("PrismaClient") private p: PrismaClient) {}
  async create(stateValue: string) {
    return await this.p.authState.create({ data: { state: stateValue } });
  }
  async get(stateId: string) {
    return await this.p.authState.findUnique({ where: { id: stateId } });
  }
}
