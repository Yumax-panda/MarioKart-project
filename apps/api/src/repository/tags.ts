import type { PrismaClient, Tag } from "@prisma/client/edge";
import { inject, injectable } from "tsyringe";
import type { TagRepository } from "./types";

// TODO:
@injectable()
export class TagRepositoryImpl implements TagRepository {
  constructor(@inject("PrismaClient") private p: PrismaClient) {}

  async getById(tagId: string): Promise<Tag | null> {
    return await this.p.tag.findUnique({ where: { id: tagId } });
  }
}
