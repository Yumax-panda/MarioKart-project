import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { formatDate } from "@/lib/date";
import { getRpc } from "@/lib/rpc-server";
import { urls } from "@/lib/urls";
import { Tag } from "../../_components/Tag";

type Post = {
  id: string;
  title: string;
  thumbnail: string;
  tags: string[];
  updatedAt: string;
  user: {
    name: string;
    image: string | null;
  };
  // TODO: Add published field when backend endpoint is updated
  published?: boolean;
};

export default async function PostsManagementPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    notFound();
  }

  const client = await getRpc();
  const res = await client.api.v1.posts.$get({
    query: {
      userId: currentUser.id,
      page: "1",
      perPage: "3",
    },
  });

  if (!res.ok) {
    notFound();
  }

  const { posts } = await res.json();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-bold text-3xl text-white">あなたの記事</h1>
        <Link
          href="/posts/new"
          className="rounded-lg bg-teal-500 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-teal-600"
        >
          新規作成
        </Link>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-12 text-center">
            <p className="text-gray-400">まだ記事がありません</p>
            <Link
              href="/posts/new"
              className="mt-4 inline-block text-teal-400 hover:text-teal-300"
            >
              最初の記事を作成する
            </Link>
          </div>
        ) : (
          posts.map((post: Post) => (
            <article
              key={post.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-gray-700 bg-gray-800/50 p-6 transition-colors hover:border-gray-600 hover:bg-gray-800/70"
            >
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <Link
                    href={urls.postDetail(post.id)}
                    className="truncate font-semibold text-blue-400 text-lg hover:text-blue-300 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs ${
                      post.published
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-gray-500/30 bg-gray-500/10 text-gray-400"
                    }`}
                  >
                    {post.published ? "公開" : "下書き"}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tagName) => (
                        <Tag name={tagName} key={tagName} />
                      ))}
                    </div>
                  )}
                  <span className="text-gray-500">
                    更新: {formatDate(new Date(post.updatedAt))}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={urls.postDetailEdit(post.id)}
                  className="rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-2 text-gray-300 text-sm transition-colors hover:border-gray-500 hover:bg-gray-700"
                >
                  編集
                </Link>
                <button
                  type="button"
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-400 text-sm transition-colors hover:border-red-500/50 hover:bg-red-500/20"
                >
                  削除
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
