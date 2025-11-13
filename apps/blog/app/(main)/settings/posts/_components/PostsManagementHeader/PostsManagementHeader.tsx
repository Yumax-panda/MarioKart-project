import Link from "next/link";

type Props = {
  userName: string;
};

export const PostsManagementHeader = ({ userName }: Props) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="font-bold text-3xl text-white">{userName}の記事</h1>
      <Link
        href="/posts/new"
        className="rounded-lg bg-teal-500 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-teal-600"
      >
        新規作成
      </Link>
    </div>
  );
};
