import { client } from "@/lib/client";

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const res = await client.api.v1.posts[":postId"].$get({
    param: { postId },
  });

  const _data = await res.json();
}
