"use client";

import { BackButton } from "app/_components/BackButton";
import { cn } from "@/lib/css";
import { urls } from "@/lib/urls";
import { ContentWrapper } from "../ContentWrapper";
import { MarkdownWrapper } from "../MarkdownWrapper";
import { Thumbnail } from "../Thumbnail";
import { EditorInput } from "./EditorInput";
import { EditorToolbar } from "./EditorToolbar";
import { FieldError } from "./FieldError";
import { useEditor } from "./hooks/useEditor";
import { MarkdownPreview } from "./MarkdownPreview";

type Props = {
  postId: string;
  markdown: string | null;
  title: string | null;
  thumbnail: string | null;
  published: boolean;
};

export const Editor = ({
  postId,
  markdown,
  title,
  thumbnail,
  published,
}: Props) => {
  const {
    currentTitle,
    setTitle,
    currentThumbnail,
    handleThumbnailUpload,
    currentMarkdown,
    setMarkdown,
    currentPublished,
    togglePublished,
    currentShowPreview,
    toggleShowPreview,
    handleSubmit,
    fieldErrors,
    generalError,
    isSaving,
    hasChanges,
  } = useEditor({
    postId,
    initialMarkdown: markdown,
    initialTitle: title,
    initialThumbnail: thumbnail,
    initialPublished: published,
  });

  return (
    <div className={cn("min-h-screen p-4 text-white")}>
      <form onSubmit={handleSubmit}>
        {/* 全体的なエラーメッセージ */}
        {generalError && (
          <div className="mb-4 rounded border border-red-500 bg-red-500/20 p-3 text-red-300">
            {generalError}
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <BackButton href={urls.postsDetail(postId)} label="編集を終了" />

          <EditorToolbar
            currentThumbnail={currentThumbnail}
            handleThumbnailUpload={handleThumbnailUpload}
            currentPublished={currentPublished}
            togglePublished={togglePublished}
            currentShowPreview={currentShowPreview}
            toggleShowPreview={toggleShowPreview}
            isSaving={isSaving}
            hasChanges={hasChanges}
          />
        </div>

        <ContentWrapper className="mx-auto flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="タイトルを入力"
              value={currentTitle ?? ""}
              onChange={(e) => setTitle(e.target.value)}
              className={cn(
                "w-full border-none bg-transparent p-1 text-center font-bold text-3xl leading-tight focus:ring-0",
                fieldErrors.title && "ring-2 ring-red-500",
              )}
            />
            {fieldErrors.title && (
              <FieldError
                message={fieldErrors.title}
                className="mt-1 text-center"
              />
            )}
          </div>

          {currentThumbnail && (
            <Thumbnail src={currentThumbnail} title={currentTitle} />
          )}
          {fieldErrors.thumbnail && (
            <FieldError message={fieldErrors.thumbnail} />
          )}

          <MarkdownWrapper>
            {currentShowPreview ? (
              <MarkdownPreview markdown={currentMarkdown} />
            ) : (
              <div>
                <EditorInput
                  currentInputValue={currentMarkdown}
                  onChange={setMarkdown}
                  hasError={!!fieldErrors.article}
                />
                {fieldErrors.article && (
                  <FieldError message={fieldErrors.article} className="mt-2" />
                )}
              </div>
            )}
          </MarkdownWrapper>
        </ContentWrapper>
      </form>
    </div>
  );
};
