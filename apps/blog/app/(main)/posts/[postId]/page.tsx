import { notFound } from "next/navigation";
import { client } from "@/lib/client";
import { PostPreview } from "./_components/PostPreview";

export default async function Page(props: PageProps<"/posts/[postId]">) {
  const { postId } = await props.params;
  const postRes = await client.api.v1.posts[":postId"].$get({
    param: { postId },
  });

  if (!postRes.ok) notFound();

  const post = await postRes.json();

  if (!post.article || !post.thumbnail || !post.title) notFound();

  if (!post.published) {
    const userRes = await client.api.v1.users["@me"].$get();

    if (!userRes.ok) notFound();

    const {
      user: { id },
    } = await userRes.json();

    if (id !== post.userId) notFound();
  }

  return (
    <div className="min-h-screen">
      <PostPreview
        title={post.title}
        thumbnail={post.thumbnail}
        article={post.article}
      />
    </div>
  );
}
