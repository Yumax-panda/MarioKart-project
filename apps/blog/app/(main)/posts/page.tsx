import { notFound } from "next/navigation";
import { getRpc } from "@/lib/rpc-server";
import { PostCard } from "../_components/PostCard";

type Props = {
  searchParams: Promise<{
    userId?: string;
  }>;
};

export default async function PostsPage({ searchParams }: Props) {
  const { userId } = await searchParams;
  const rpc = await getRpc();

  const res = await rpc.api.v1.posts.$get({
    query: {
      page: "1",
      perPage: "12",
      ...(userId ? { userId } : {}),
    },
  });

  if (!res.ok) notFound();

  const { posts } = await res.json();

  if (!posts.length) notFound();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(({ updatedAt, ...rest }) => (
          <PostCard key={rest.id} {...rest} date={new Date(updatedAt)} />
        ))}
      </div>
    </div>
  );
}
