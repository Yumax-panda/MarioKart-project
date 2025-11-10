"use client";

import { cn } from "@/lib/css";
import { ContentWrapper } from "../ContentWrapper";
import { MarkdownWrapper } from "../MarkdownWrapper";
import { Thumbnail } from "../Thumbnail";
import { EditorInput } from "./EditorInput";
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
    saveSuccess,
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
        <div className="mb-4 flex justify-end">
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">
              サムネイル {currentThumbnail ? "更新" : "設定"}
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-sm">公開:</span>
              <button
                type="button"
                onClick={togglePublished}
                className={cn(
                  "h-6 w-12 rounded-full p-1 transition-colors",
                  currentPublished
                    ? "justify-end bg-green-500"
                    : "justify-start bg-gray-500",
                  "flex items-center",
                )}
              >
                <span className="block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform" />
              </button>
            </div>

            <button
              type="button"
              onClick={toggleShowPreview}
              className="rounded bg-gray-600 px-3 py-2 text-sm text-white hover:bg-gray-700"
            >
              {currentShowPreview ? "エディタに戻る" : "プレビューを見る"}
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className={cn(
                "rounded px-4 py-2 font-semibold text-white",
                isSaving
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700",
              )}
            >
              {isSaving ? "保存中..." : "保存"}
            </button>

            {saveSuccess && (
              <span className="text-green-400 text-sm">保存しました!</span>
            )}
          </div>
        </div>

        <ContentWrapper className="mx-auto flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="タイトルを入力"
              value={currentTitle ?? ""}
              onChange={(e) => setTitle(e.target.value)}
              className={cn(
                "mr-4 w-full border-none bg-transparent p-1 text-center font-bold text-3xl focus:ring-0",
                fieldErrors.title && "ring-2 ring-red-500",
              )}
            />
            {fieldErrors.title && (
              <p className="mt-1 text-center text-red-400 text-sm">
                {fieldErrors.title}
              </p>
            )}
          </div>

          {currentThumbnail && (
            <Thumbnail src={currentThumbnail} title={currentTitle} />
          )}
          {fieldErrors.thumbnail && (
            <p className="text-red-400 text-sm">{fieldErrors.thumbnail}</p>
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
                  <p className="mt-2 text-red-400 text-sm">
                    {fieldErrors.article}
                  </p>
                )}
              </div>
            )}
          </MarkdownWrapper>
        </ContentWrapper>
      </form>
    </div>
  );
};
