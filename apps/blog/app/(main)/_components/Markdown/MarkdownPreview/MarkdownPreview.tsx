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
          //biome-ignore lint/performance/noImgElement: Next.js特有のコンポーネントは使用しない方針
          <img
            src={props.src}
            alt={props.alt ?? ""}
            loading="lazy"
            className="mx-auto my-6 block h-auto max-w-full rounded-lg"
          />
        ),
        // ref: https://zenn.dev/team_zenn/articles/2060cd717894cfa7a0c4#1.-%E3%83%AA%E3%83%B3%E3%82%AF%E3%81%AE%E6%82%AA%E7%94%A8%E3%82%92%E9%98%B2%E3%81%90
        a: ({ href, children }) => (
          <a href={href} rel="nofollow noreferrer noopener" target="_blank">
            {children}
          </a>
        ),
      }}
    >
      {markdown}
    </MarkdownHooks>
  );
});
