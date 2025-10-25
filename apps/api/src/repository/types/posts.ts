import type { Post, User } from "@prisma/client";
import type { PublishedPostType } from "@repo/schema/post";

export type PostListItem = Pick<
  PublishedPostType,
  "id" | "title" | "thumbnail" | "updatedAt"
> & {
  user: Pick<User, "name" | "image">;
  tags: string[];
};

type PostDetail = Post & { user: Pick<User, "id" | "name" | "image"> };

// TODO:
export interface PostRepository {
  getPublishedPostList(page: number, perPage: number): Promise<PostListItem[]>;
  getPublishedPostCount(): Promise<number>;
  getDetailById(postId: string): Promise<PostDetail | null>;
}
