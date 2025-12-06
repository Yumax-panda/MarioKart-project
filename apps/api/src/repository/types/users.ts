import type { User } from "@prisma/client";

export type GetByAccountProps = {
  provider: string;
  providerAccountId: string;
};
export type CreateUserProps = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserProps = Pick<User, "id"> &
  Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;

// TODO:
export interface UserRepository {
  getById(userId: string): Promise<User | null>;
  getByAccount(props: GetByAccountProps): Promise<User | null>;
  create(user: CreateUserProps): Promise<User>;
  update(props: UpdateUserProps): Promise<User>;
}
