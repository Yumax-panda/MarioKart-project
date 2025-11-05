import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
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

  // Check if current user is the post owner
  const currentUser = await getCurrentUser();
  const isOwner = currentUser?.id === post.userId;

  // If post is not published, only the owner can view it
  if (!post.published && !isOwner) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <PostPreview
        postId={postId}
        title={post.title}
        thumbnail={post.thumbnail}
        article={post.article}
        isEditable={isOwner}
      />
    </div>
  );
}
