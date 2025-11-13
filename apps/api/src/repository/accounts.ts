import type { Account, PrismaClient } from "@prisma/client/edge";
import { inject, injectable } from "tsyringe";
import type {
  AccountRepository,
  CreateAccountProps,
  GetByIdProps,
  UpdateAccountProps,
} from "./types";

@injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(@inject("PrismaClient") private p: PrismaClient) {}

  async getById(id: GetByIdProps): Promise<Account | null> {
    return await this.p.account.findUnique({
      where: {
        provider_providerAccountId: id,
      },
    });
  }

  async create(account: CreateAccountProps) {
    return await this.p.account.create({
      data: account,
    });
  }

  async update({
    provider,
    providerAccountId,
    ...rest
  }: UpdateAccountProps): Promise<Account> {
    return await this.p.account.update({
      data: rest,
      where: { provider_providerAccountId: { provider, providerAccountId } },
    });
  }
}
