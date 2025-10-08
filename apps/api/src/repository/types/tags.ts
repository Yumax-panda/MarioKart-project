import type { Tag } from "@prisma/client";

// TODO:
export interface TagRepository {
  getById(tagId: string): Promise<Tag | null>;
}
