import type { PrismaClient } from "@prisma/client/edge";
import { inject, injectable } from "tsyringe";
import type { PostListItem, PostRepository } from "./types";

// TODO:
@injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(@inject("PrismaClient") private p: PrismaClient) {}
  async getPublishedPostList(page: number, perPage: number) {
    const skip = (page - 1) * perPage;

    const rawPosts = await this.p.post.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        updatedAt: true,
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip,
      take: perPage,
    });

    return rawPosts.map(({ tags, ...rest }) => ({
      tags: tags.map(({ tag: { name } }) => name),
      ...rest,
    })) as PostListItem[];
  }
  async getPublishedPostCount() {
    return await this.p.post.count({ where: { published: true } });
  }
  async getById(postId: string) {
    return await this.p.post.findUnique({ where: { id: postId } });
  }
}
