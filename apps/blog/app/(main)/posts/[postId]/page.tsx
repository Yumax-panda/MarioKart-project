import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getRpc } from "@/lib/rpc-server";
import { EditButton } from "./_components/EditButton";
import { PostPreview } from "./_components/PostPreview";

// Force dynamic rendering (required for cookies/auth)
export const dynamic = "force-dynamic";

export default async function Page(props: PageProps<"/posts/[postId]">) {
  const { postId } = await props.params;
  const client = await getRpc();
  const postRes = await client.api.v1.posts[":postId"].$get({
    param: { postId },
  });

  if (!postRes.ok) notFound();

  const post = await postRes.json();

  // Check if current user is the post owner
  const currentUser = await getCurrentUser();
  const isOwner = currentUser?.id === post.userId;

  // If post is not published, only the owner can view it
  if (!post.published && !isOwner) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-16">
      <PostPreview
        title={post.title || "No title"}
        thumbnail={post.thumbnail}
        article={post.article || ""}
        authorName={post.user.name}
        authorImage={post.user.image}
      />
      {isOwner && <EditButton postId={postId} />}
    </div>
  );
}
