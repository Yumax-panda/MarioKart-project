import { MarkdownHooks } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStarryNight from "rehype-starry-night";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

const rehypePlugins = [rehypeRaw, rehypeSlug, rehypeStarryNight];
const remarkPlugins = [remarkGfm, remarkToc];

type Props = {
  markdown: string;
};

export const MarkdownPreview = ({ markdown }: Props) => {
  return (
    <MarkdownHooks rehypePlugins={rehypePlugins} remarkPlugins={remarkPlugins}>
      {markdown}
    </MarkdownHooks>
  );
};
