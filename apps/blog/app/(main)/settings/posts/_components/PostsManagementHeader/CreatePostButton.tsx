"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { client } from "@/lib/rpc-browser";
import { urls } from "@/lib/urls";

export const CreatePostButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const res = await client.api.v1.posts.$post();

      if (!res.ok) {
        console.error("Failed to create or get empty post");
        return;
      }

      const { post } = await res.json();
      router.push(urls.postsDetailEdit(post.id));
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="rounded-lg bg-teal-500 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? "作成中..." : "新規作成"}
    </button>
  );
};
