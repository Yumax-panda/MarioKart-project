import type { ReactNode } from "react";
import { ContentWrapper } from "../ContentWrapper";
import { MarkdownWrapper } from "../MarkdownWrapper";

type Props = {
  title: string;
  children: ReactNode;
};

export const ArticleLayout = ({ title, children }: Props) => (
  <ContentWrapper className="mx-auto flex flex-col gap-4 pt-16">
    <div className="flex items-center justify-center">
      <h1 className="text-center leading-tight" id={title}>
        {title}
      </h1>
    </div>
    <MarkdownWrapper>{children}</MarkdownWrapper>
  </ContentWrapper>
);
