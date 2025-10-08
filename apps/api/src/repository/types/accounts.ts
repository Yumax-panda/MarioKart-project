import type { Account } from "@prisma/client";

// TODO:
export interface AccountRepository {
  getById(provider: string, providerAccountId: string): Promise<Account | null>;
}
