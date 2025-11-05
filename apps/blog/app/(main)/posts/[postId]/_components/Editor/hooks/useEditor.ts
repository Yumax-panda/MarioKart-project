import { UpdatePostBodySchema } from "@repo/schema/post";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { client } from "@/lib/client";

type Props = {
  postId: string;
  initialTitle: string | null;
  initialThumbnail: string | null;
  initialMarkdown: string | null;
  initialPublished: boolean;
};

// TODO:
export const useEditor = ({
  postId,
  initialTitle,
  initialThumbnail,
  initialMarkdown,
  initialPublished,
}: Props) => {
  const [currentTitle, setTitle] = useState(initialTitle ?? "");
  const [currentThumbnail, setThumbnail] = useState(initialThumbnail ?? "");
  const [currentMarkdown, setMarkdown] = useState(initialMarkdown ?? "");
  const [currentPublished, setPublished] = useState(initialPublished);
  const [currentShowPreview, setShowPreview] = useState(false);

  const handleThumbnailUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (!files || !files.length) return;

    const file = files[0];

    if (!file) return; // 起こり得ない

    const presignedURLRes = await client.api.v1.presignedURL.generate.$post({
      json: {
        purpose: "uploadThumbnail",
        size: file.size,
        // @ts-expect-error: zodでバリデーションするのでOK,
        imageType: file.type,
      },
    });

    if (!presignedURLRes.ok) return; // TODO

    const { presignedURL, fileURL } = await presignedURLRes.json();

    const r2Res = await fetch(presignedURL, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!r2Res.ok) return; // TODO

    setThumbnail(fileURL);
  };

  const togglePublished = () => setPublished((v) => !v);

  const toggleShowPreview = () => setShowPreview((v) => !v);

  // TODO
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = UpdatePostBodySchema.safeParse({
      article: currentMarkdown || undefined,
      title: currentTitle || undefined,
      thumbnail: currentThumbnail || undefined,
      published: currentPublished,
    });

    if (!result.success) {
      // TODO
      return console.log("parse failed");
    }

    const res = await client.api.v1.posts[":postId"].$patch({
      param: { postId },
      json: result.data,
    });

    // TODO
    if (res.ok) return console.log("updated");
  };

  return {
    currentTitle,
    setTitle,
    currentThumbnail,
    handleThumbnailUpload,
    currentMarkdown,
    setMarkdown,
    currentPublished,
    togglePublished,
    currentShowPreview,
    toggleShowPreview,
    handleSubmit,
  };
};
