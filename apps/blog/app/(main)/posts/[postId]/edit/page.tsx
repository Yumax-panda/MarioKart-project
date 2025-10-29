import { notFound } from "next/navigation";
import { client } from "@/lib/client";
import { Editor } from "../_components/Editor";

// const post = {
//   id: "1",
//   article: "## here",
//   title: null,
//   thumbnail: null,
//   published: false,
// };

// TODO:
export default async function Page(props: PageProps<"/posts/[postId]">) {
  const { postId } = await props.params;

  const [postRes, userRes] = await Promise.all([
    client.api.v1.posts[":postId"].$get({ param: { postId } }),
    client.api.v1.users["@me"].$get(),
  ]);

  if (!(postRes.ok && userRes.ok)) notFound();

  const [post, { user }] = await Promise.all([postRes.json(), userRes.json()]);

  if (post.userId !== user.id) notFound();

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
