"use client";

import { Loading } from "app/(main)/_components/Loading";
import { useAccount } from "context/AccountContext";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { client } from "@/lib/client";
import { Editor } from "../_components/Editor";

export default function Page(props: PageProps<"/posts/[postId]">) {
  const { postId } = use(props.params);
  const [post, setPost] = useState<Parameters<typeof Editor>[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldNotFound, setShouldNotFound] = useState(false);
  const { account } = useAccount();

  useEffect(() => {
    if (account === undefined) {
      return;
    }

    if (!account) {
      setShouldNotFound(true);
      return;
    }

    setIsLoading(true);
    client.api.v1.posts[":postId"]
      .$get({ param: { postId } })
      .then(async (res) => {
        if (!res.ok) {
          setShouldNotFound(true);
          return;
        }
        const data = await res.json();
        setPost({
          postId: data.id,
          markdown: data.article,
          title: data.title,
          thumbnail: data.thumbnail,
          published: data.published,
        });
        setIsLoading(false);
      })
      .catch(() => {
        setShouldNotFound(true);
      });
  }, [postId, account]);

  if (shouldNotFound) {
    notFound();
  }

  if (isLoading || !post) return <Loading />;

  return (
    <Editor
      postId={post.postId}
      markdown={post.markdown}
      title={post.title}
      thumbnail={post.thumbnail}
      published={post.published}
    />
  );
}
