import { ContentWrapper } from "../ContentWrapper";
import { MarkdownPreview } from "../Editor/MarkdownPreview";
import { MarkdownWrapper } from "../MarkdownWrapper";
import { Thumbnail } from "../Thumbnail";

type Props = {
  title: string;
  thumbnail: string;
  article: string;
};

export const PostPreview = ({ title, thumbnail, article }: Props) => (
  <ContentWrapper className="mx-auto flex flex-col gap-4">
    <h1 className="mb-4 text-center leading-tight" id={title}>
      {title}
    </h1>
    <Thumbnail src={thumbnail} title={title} />
    <MarkdownWrapper>
      <MarkdownPreview markdown={article} />
    </MarkdownWrapper>
  </ContentWrapper>
);
