import { ContentWrapper } from "@/app/(main)/_components/Markdown/ContentWrapper";
import { MarkdownPreview } from "@/app/(main)/_components/Markdown/MarkdownPreview";
import { MarkdownWrapper } from "@/app/(main)/_components/Markdown/MarkdownWrapper";
import { AuthorInfo } from "../AuthorInfo";
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
  <div className="relative">
    {/* Decorative background elements */}
    <div className="pointer-events-none absolute top-0 left-0 h-[600px] w-full overflow-hidden opacity-20">
      <div className="absolute top-20 right-10 h-[2px] w-40 rotate-45 bg-gradient-to-r from-transparent via-[var(--color-racing-cyan)] to-transparent" />
      <div className="-rotate-45 absolute top-40 left-10 h-[2px] w-32 bg-gradient-to-r from-transparent via-[var(--color-racing-magenta)] to-transparent" />
    </div>

    <ContentWrapper className="relative z-10 mx-auto flex flex-col gap-8 pt-16">
      {/* Title section with accent */}
      <div className="relative flex items-center justify-center">
        <div className="-translate-y-1/2 absolute top-1/2 left-0 h-[2px] w-12 bg-gradient-to-r from-transparent to-[var(--color-racing-cyan)]" />
        <h1
          className="animate-fade-in-up px-16 text-center font-bold text-3xl text-white leading-tight sm:text-4xl lg:text-5xl"
          id={title}
        >
          {title}
        </h1>
        <div className="-translate-y-1/2 absolute top-1/2 right-0 h-[2px] w-12 bg-gradient-to-l from-transparent to-[var(--color-racing-magenta)]" />
      </div>

      {thumbnail && <Thumbnail src={thumbnail} title={title} />}

      <MarkdownWrapper>
        <MarkdownPreview markdown={article} />
        <AuthorInfo name={authorName} image={authorImage} />
      </MarkdownWrapper>
    </ContentWrapper>
  </div>
);
