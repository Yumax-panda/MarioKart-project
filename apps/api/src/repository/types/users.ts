import type { User } from "@prisma/client";

// TODO:
export interface UserRepository {
  getById(userId: string): Promise<User | null>;
}
