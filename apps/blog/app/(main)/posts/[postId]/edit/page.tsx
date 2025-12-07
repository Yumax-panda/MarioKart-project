import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getRpc } from "@/lib/rpc-server";
import { Editor } from "../_components/Editor";

// Force dynamic rendering (required for cookies/auth)
export const dynamic = "force-dynamic";

export default async function Page(props: PageProps<"/posts/[postId]">) {
  const { postId } = await props.params;

  // Check if user is logged in
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    notFound();
  }

  // Get post data with authentication
  const client = await getRpc();
  const postRes = await client.api.v1.posts[":postId"].$get({
    param: { postId },
  });

  if (!postRes.ok) {
    notFound();
  }

  const post = await postRes.json();

  // Only the post owner can edit
  if (post.userId !== currentUser.id) {
    notFound();
  }

  return (
    <Editor
      postId={post.id}
      markdown={post.article}
      title={post.title}
      thumbnail={post.thumbnail}
      published={post.published}
    />
  );
}
