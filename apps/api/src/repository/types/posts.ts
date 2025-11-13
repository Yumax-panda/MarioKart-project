import type { Post, User } from "@prisma/client";
import type { PublishedPostType } from "@repo/schema/post";

export type PostListItem = Pick<
  PublishedPostType,
  "id" | "title" | "thumbnail" | "updatedAt"
> & {
  user: Pick<User, "name" | "image">;
  tags: string[];
};

export type UserPostListItem = Omit<
  Pick<Post, "id" | "title" | "thumbnail" | "published">,
  never
> & {
  updatedAt: string;
  tags: string[];
};

type PostDetail = Post & { user: Pick<User, "id" | "name" | "image"> };
export type UpdatePostProps = Pick<Post, "id"> &
  Partial<Omit<Post, "id" | "userId" | "createdAt" | "updatedAt">>;

export interface PostRepository {
  getPublishedPostList(
    page: number,
    perPage: number,
    userId?: string,
  ): Promise<PostListItem[]>;
  getPublishedPostCount(userId?: string): Promise<number>;
  /**
   * ユーザーの全ての記事を取得する（公開・非公開含む）
   * @param userId - 記事を取得するユーザーのID
   * @param page - ページ番号
   * @param perPage - 1ページあたりの記事数
   */
  getUserAllPosts(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<UserPostListItem[]>;
  /**
   * ユーザーの全ての記事数を取得する（公開・非公開含む）
   * @param userId - 記事数を取得するユーザーのID
   */
  getUserPostCount(userId: string): Promise<number>;
  getDetailById(postId: string): Promise<PostDetail | null>;
  /**
   * 何も入力されていない空の記事を返す。もともと空の記事が存在していた場合はそれを返し、存在しなければ新しく作る。
   * @param userId - 記事を作成するユーザーのID
   */
  createOrGetEmpty(userId: string): Promise<Post>;
  update(data: UpdatePostProps): Promise<Post>;
}
