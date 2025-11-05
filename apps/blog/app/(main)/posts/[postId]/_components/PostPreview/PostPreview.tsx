import Link from "next/link";
import { urls } from "@/lib/urls";
import { ContentWrapper } from "../ContentWrapper";
import { MarkdownPreview } from "../Editor/MarkdownPreview";
import { MarkdownWrapper } from "../MarkdownWrapper";
import { Thumbnail } from "../Thumbnail";

type Props = {
  postId: string;
  title: string;
  thumbnail: string;
  article: string;
  isEditable?: boolean;
};

export const PostPreview = ({
  postId,
  title,
  thumbnail,
  article,
  isEditable = false,
}: Props) => (
  <ContentWrapper className="mx-auto flex flex-col gap-4">
    <div className="mb-4 flex items-center justify-center gap-4">
      <h1 className="text-center leading-tight" id={title}>
        {title}
      </h1>
      {isEditable && (
        <Link
          href={urls.postDetailEdit(postId)}
          className="rounded-lg bg-teal-500 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-teal-600"
        >
          編集
        </Link>
      )}
    </div>
    <Thumbnail src={thumbnail} title={title} />
    <MarkdownWrapper>
      <MarkdownPreview markdown={article} />
    </MarkdownWrapper>
  </ContentWrapper>
);
