import { notFound } from "next/navigation";
import { getCookieHeader, getCurrentUser } from "@/lib/auth";
import { client } from "@/lib/client";
import { Editor } from "../_components/Editor";

export default async function Page(props: PageProps<"/posts/[postId]">) {
  const { postId } = await props.params;

  // Check if user is logged in
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    notFound();
  }

  // Get post data with authentication
  const cookieHeader = await getCookieHeader();
  const postRes = await client.api.v1.posts[":postId"].$get(
    {
      param: { postId },
    },
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

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
