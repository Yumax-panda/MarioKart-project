import { notFound } from "next/navigation";
import { getRpc } from "@/lib/rpc-server";
import { Hero } from "./_components/Hero";
import { PostCard } from "./_components/PostCard";

// Force dynamic rendering (required for cookies/auth)
export const dynamic = "force-dynamic";

export default async function Page() {
  const client = await getRpc();
  const res = await client.api.v1.posts.$get({
    query: { page: "1", perPage: "3" },
  });

  if (!res.ok) notFound();

  const { posts } = await res.json();

  return (
    <>
      <Hero />
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(({ updatedAt, ...rest }) => (
            <PostCard key={rest.id} {...rest} date={new Date(updatedAt)} />
          ))}
        </div>
      </div>
    </>
  );
}
