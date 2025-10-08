import type { PrismaClient, User } from "@prisma/client/edge";
import { inject, injectable } from "tsyringe";
import type { UserRepository } from "./types";

// TODO:
@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@inject("PrismaClient") private p: PrismaClient) {}

  async getById(userId: string): Promise<User | null> {
    return await this.p.user.findUnique({ where: { id: userId } });
  }
}
