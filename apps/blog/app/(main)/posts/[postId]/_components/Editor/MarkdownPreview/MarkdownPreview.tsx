"use client";

import { memo } from "react";
import { MarkdownHooks } from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeStarryNight from "rehype-starry-night";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

const rehypePlugins = [rehypeSlug, rehypeStarryNight];
const remarkPlugins = [remarkGfm, remarkToc];

type Props = {
  markdown: string;
};

export const MarkdownPreview = memo(({ markdown }: Props) => {
  return (
    <MarkdownHooks
      rehypePlugins={rehypePlugins}
      remarkPlugins={remarkPlugins}
      components={{
        // タイトルは別フィールドで入力するため、h1はプレーンテキストとして表示
        h1: ({ children }) => <p># {children}</p>,
        img: (props) => (
          //biome-ignore lint/performance/noImgElement: Next.jsから独立したパッケージの処理なので
          <img
            src={props.src}
            alt={props.alt ?? ""}
            loading="lazy"
            className="mx-auto my-6 block h-auto max-w-full rounded-lg"
          />
        ),
      }}
    >
      {markdown}
    </MarkdownHooks>
  );
});
