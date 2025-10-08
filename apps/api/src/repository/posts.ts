import type { Post, PrismaClient } from "@prisma/client/edge";
import { inject, injectable } from "tsyringe";
import type { PostRepository } from "./types";

// TODO:
@injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(@inject("PrismaClient") private p: PrismaClient) {}
  async getById(postId: string): Promise<Post | null> {
    return await this.p.post.findUnique({ where: { id: postId } });
  }
}
