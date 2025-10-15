import { notFound } from "next/navigation";
import { client } from "@/lib/client";
import { MarkdownPreview } from "./_components/Editor/MarkdownPreview";

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const res = await client.api.v1.posts[":postId"].$get({
    param: { postId },
  });

  if (!res.ok) notFound();

  const post = await res.json();

  if (!post.article) notFound();

  return <MarkdownPreview markdown={post.article} />;
}
