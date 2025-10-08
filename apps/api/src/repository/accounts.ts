import type { Account, PrismaClient } from "@prisma/client/edge";
import { inject, injectable } from "tsyringe";
import type { AccountRepository } from "./types";

// TODO:
@injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(@inject("PrismaClient") private p: PrismaClient) {}

  async getById(
    provider: string,
    providerAccountId: string,
  ): Promise<Account | null> {
    return await this.p.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
    });
  }
}
