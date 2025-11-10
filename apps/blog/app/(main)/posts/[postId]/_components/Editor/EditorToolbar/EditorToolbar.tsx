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

        <PublishToggle
          published={currentPublished}
          onToggle={togglePublished}
        />

        <button
          type="button"
          onClick={toggleShowPreview}
          className="w-40 rounded bg-gray-600 px-3 py-2 text-sm text-white hover:bg-gray-700"
        >
          {currentShowPreview ? "エディタに戻る" : "プレビューを見る"}
        </button>

        <button
          type="submit"
          disabled={isDisabled}
          className={cn(
            "w-28 rounded px-4 py-2 font-semibold text-white",
            isDisabled
              ? "cursor-not-allowed bg-gray-400"
              : "bg-indigo-600 hover:bg-indigo-700",
          )}
        >
          {getSaveButtonLabel(isSaving, hasChanges)}
        </button>
      </div>
    </div>
  );
};
