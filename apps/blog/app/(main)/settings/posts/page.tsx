import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getRpc } from "@/lib/rpc-server";
import { PostsList } from "./_components/PostsList";
import { PostsManagementHeader } from "./_components/PostsManagementHeader";

export default async function PostsManagementPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <div>not logged in</div>;
  }

  const client = await getRpc();
  const res = await client.api.v1.users["@me"].posts.$get({
    query: {
      page: "1",
      perPage: "100",
    },
  });

  if (!res.ok) {
    return <div>{JSON.stringify(res)}</div>;
  }

  const { posts } = await res.json();

  const validPosts = posts.map((post) => ({
    id: post.id,
    title: post.title || "No title",
    published: post.published,
    tags: post.tags,
    updatedAt: post.updatedAt,
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <PostsManagementHeader />
      <PostsList posts={validPosts} />
    </div>
  );
}
