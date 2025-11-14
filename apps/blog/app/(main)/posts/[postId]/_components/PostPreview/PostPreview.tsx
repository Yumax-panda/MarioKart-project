import { AuthorInfo } from "../AuthorInfo";
import { ContentWrapper } from "../ContentWrapper";
import { MarkdownPreview } from "../Editor/MarkdownPreview";
import { MarkdownWrapper } from "../MarkdownWrapper";
import { Thumbnail } from "../Thumbnail";

type Props = {
  title: string;
  thumbnail: string | null;
  article: string;
  authorName: string | null;
  authorImage: string | null;
};

export const PostPreview = ({
  title,
  thumbnail,
  article,
  authorName,
  authorImage,
}: Props) => (
  <ContentWrapper className="mx-auto flex flex-col gap-4">
    <div className="mb-4 flex items-center justify-center">
      <h1 className="text-center leading-tight" id={title}>
        {title}
      </h1>
    </div>
    {thumbnail && <Thumbnail src={thumbnail} title={title} />}
    <MarkdownWrapper>
      <MarkdownPreview markdown={article} />
      <AuthorInfo name={authorName} image={authorImage} />
    </MarkdownWrapper>
  </ContentWrapper>
);
