import Image from "next/image";
import { MarkdownPreview } from "../Editor/MarkdownPreview";

type Props = {
  title: string;
  thumbnail: string;
  article: string;
};

export const PostPreview = ({ title, thumbnail, article }: Props) => (
  <div className="prose dark:prose-invert">
    <h1 className="mb-4 leading-tight" id={title}>
      {title}
    </h1>
    <div className="not-prose relative h-80 w-full overflow-hidden rounded-2xl">
      <Image
        src={thumbnail}
        alt={`Thumbnail: ${title}`}
        className="object-cover"
        fill
      />
    </div>
    <MarkdownPreview markdown={article} />
  </div>
);
