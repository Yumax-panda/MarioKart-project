import type { Account } from "@prisma/client";

export type GetByIdProps = {
  provider: string;
  providerAccountId: string;
};
export type CreateAccountProps = Omit<Account, "createdAt" | "updatedAt">;
export type UpdateAccountProps = Omit<
  Account,
  "userId" | "createdAt" | "updatedAt"
>;

// TODO:
export interface AccountRepository {
  getById(id: GetByIdProps): Promise<Account | null>;
  create(account: CreateAccountProps): Promise<Account>;
  update(account: UpdateAccountProps): Promise<Account>;
}
