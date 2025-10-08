import type { Post } from "@prisma/client";

// TODO:
export interface PostRepository {
  getById(postId: string): Promise<Post | null>;
}
