import Link from "next/link";

export const EmptyPostsState = () => {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-12 text-center">
      <p className="text-gray-400">まだ記事がありません</p>
      <Link
        href="/posts/new"
        className="mt-4 inline-block text-teal-400 hover:text-teal-300"
      >
        最初の記事を作成する
      </Link>
    </div>
  );
};
