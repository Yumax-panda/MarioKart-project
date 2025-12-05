import type { ChangeEvent } from "react";
import { cn } from "@/lib/css";
import { PublishToggle } from "../PublishToggle";

type Props = {
  currentThumbnail: string;
  handleThumbnailUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  currentPublished: boolean;
  togglePublished: () => void;
  currentShowPreview: boolean;
  toggleShowPreview: () => void;
  isSaving: boolean;
  hasChanges: boolean;
};

const getSaveButtonLabel = (isSaving: boolean, hasChanges: boolean): string => {
  if (isSaving) return "保存中...";
  if (!hasChanges) return "保存済み";
  return "保存";
};

export const EditorToolbar = ({
  currentThumbnail,
  handleThumbnailUpload,
  currentPublished,
  togglePublished,
  currentShowPreview,
  toggleShowPreview,
  isSaving,
  hasChanges,
}: Props) => {
  const isDisabled = isSaving || !hasChanges;

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
      <label className="cursor-pointer rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">
        <span className="hidden sm:inline">サムネイル </span>
        {currentThumbnail ? "更新" : "設定"}
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailUpload}
          className="hidden"
        />
      </label>

      <PublishToggle published={currentPublished} onToggle={togglePublished} />

      <button
        type="button"
        onClick={toggleShowPreview}
        className="rounded bg-gray-600 px-3 py-2 text-sm text-white hover:bg-gray-700 sm:w-40"
      >
        {currentShowPreview ? (
          <>
            <span className="sm:hidden">エディタ</span>
            <span className="hidden sm:inline">エディタに戻る</span>
          </>
        ) : (
          <>
            <span className="sm:hidden">プレビュー</span>
            <span className="hidden sm:inline">プレビューを見る</span>
          </>
        )}
      </button>

      <button
        type="submit"
        disabled={isDisabled}
        className={cn(
          "rounded px-3 py-2 font-semibold text-white sm:w-28 sm:px-4",
          isDisabled
            ? "cursor-not-allowed bg-gray-400"
            : "bg-indigo-600 hover:bg-indigo-700",
        )}
      >
        {getSaveButtonLabel(isSaving, hasChanges)}
      </button>
    </div>
  );
};
