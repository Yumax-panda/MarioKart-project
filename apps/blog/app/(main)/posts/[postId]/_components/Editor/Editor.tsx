"use client";

import { ImageIcon } from "app/_components/Icon/ImageIcon";
import { cn } from "@/lib/css";
import { urls } from "@/lib/urls";
import { ContentWrapper } from "../ContentWrapper";
import { MarkdownWrapper } from "../MarkdownWrapper";
import { Thumbnail } from "../Thumbnail";
import { BackButton } from "./BackButton";
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
    handlePostImageUploadByButton,
    handleDropImage,
    isUploadingImage,
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
              <section
                onDrop={handleDropImage}
                onDragOver={(e) => e.preventDefault()}
                aria-label="画像をドロップしてアップロード"
              >
                <EditorInput
                  currentInputValue={currentMarkdown}
                  onChange={setMarkdown}
                  hasError={!!fieldErrors.article}
                />
                {fieldErrors.article && (
                  <FieldError message={fieldErrors.article} className="mt-2" />
                )}
              </section>
            )}
          </MarkdownWrapper>
        </ContentWrapper>
      </form>

      <label
        className={cn(
          "group fixed bottom-10 left-6 cursor-pointer rounded-full bg-blue-600 p-3 text-white shadow-lg transition-colors hover:bg-blue-700",
          isUploadingImage && "pointer-events-none opacity-50",
        )}
        aria-label="画像を挿入"
        title="画像を挿入"
      >
        {isUploadingImage ? (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <ImageIcon />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePostImageUploadByButton}
          disabled={isUploadingImage}
        />
        <span className="-translate-x-1/2 pointer-events-none absolute bottom-full left-1/2 mb-2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-white text-xs opacity-0 transition-opacity group-hover:opacity-100">
          {isUploadingImage ? "アップロード中..." : "画像を挿入"}
        </span>
      </label>
    </div>
  );
};
