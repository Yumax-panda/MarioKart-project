import type { Post, User } from "@prisma/client";

type PostListItem = Pick<Post, "id" | "title" | "thumbnail" | "updatedAt"> & {
  user: Pick<User, "name" | "image">;
  tags: string[];
};

// TODO:
export interface PostRepository {
  getPublishedPostList(page: number, perPage: number): Promise<PostListItem[]>;
  getPublishedPostCount(): Promise<number>;
  getById(postId: string): Promise<Post | null>;
}
