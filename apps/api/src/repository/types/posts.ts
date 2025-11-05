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
export type UpdatePostProps = Pick<Post, "id"> &
  Partial<Omit<Post, "id" | "userId" | "createdAt" | "updatedAt">>;

export interface PostRepository {
  getPublishedPostList(page: number, perPage: number): Promise<PostListItem[]>;
  getPublishedPostCount(): Promise<number>;
  getDetailById(postId: string): Promise<PostDetail | null>;
  /**
   * 何も入力されていない空の記事を返す。もともと空の記事が存在していた場合はそれを返し、存在しなければ新しく作る。
   * @param userId - 記事を作成するユーザーのID
   */
  createOrGetEmpty(userId: string): Promise<Post>;
  update(data: UpdatePostProps): Promise<Post>;
}
