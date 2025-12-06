import type { PrismaClient } from "@prisma/client/edge";
import { inject, injectable } from "tsyringe";
import type {
  CreateUserProps,
  GetByAccountProps,
  UpdateUserProps,
  UserRepository,
} from "./types";

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@inject("PrismaClient") private p: PrismaClient) {}

  async getById(userId: string) {
    return await this.p.user.findUnique({ where: { id: userId } });
  }

  async getByAccount(props: GetByAccountProps) {
    const accountWithUser = await this.p.account.findUnique({
      where: { provider_providerAccountId: props },
      include: { user: true },
    });

    return accountWithUser?.user ?? null;
  }

  async create(user: CreateUserProps) {
    return await this.p.user.create({ data: user });
  }

  async update(props: UpdateUserProps) {
    const { id, ...data } = props;
    return await this.p.user.update({
      where: { id },
      data,
    });
  }
}
