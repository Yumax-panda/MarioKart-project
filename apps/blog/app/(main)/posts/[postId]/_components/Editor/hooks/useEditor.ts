import type { ValidationErrorDetail } from "@repo/schema/errorCodes";
import { UpdatePostBodySchema } from "@repo/schema/post";
import { groupErrorsByField, parseZodError } from "@repo/schema/zodErrorMapper";
import type { ChangeEvent, DragEvent, FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import {
  getBusinessErrorMessage,
  getValidationErrorMessage,
} from "@/lib/errorMessages";
import { client } from "@/lib/rpc-browser";

type Props = {
  postId: string;
  initialTitle: string | null;
  initialThumbnail: string | null;
  initialMarkdown: string | null;
  initialPublished: boolean;
};

type FieldErrors = {
  title?: string;
  thumbnail?: string;
  article?: string;
};

// ValidationErrorDetailをフィールドエラーに変換
function convertToFieldErrors(errors: ValidationErrorDetail[]): FieldErrors {
  const grouped = groupErrorsByField(errors);
  const fieldErrors: FieldErrors = {};

  for (const [field, error] of Object.entries(grouped)) {
    fieldErrors[field as keyof FieldErrors] = getValidationErrorMessage(error);
  }

  return fieldErrors;
}

export const useEditor = ({
  postId,
  initialTitle,
  initialThumbnail,
  initialMarkdown,
  initialPublished,
}: Props) => {
  const [currentTitle, setTitle] = useState(initialTitle ?? "");
  const [currentThumbnail, setThumbnail] = useState(initialThumbnail ?? "");
  const [currentMarkdown, setMarkdown] = useState(initialMarkdown ?? "");
  const [currentPublished, setPublished] = useState(initialPublished);
  const [currentShowPreview, setShowPreview] = useState(false);

  // 保存成功後の比較基準となる値（初期値から更新される）
  const [lastSavedTitle, setLastSavedTitle] = useState(initialTitle ?? "");
  const [lastSavedThumbnail, setLastSavedThumbnail] = useState(
    initialThumbnail ?? "",
  );
  const [lastSavedMarkdown, setLastSavedMarkdown] = useState(
    initialMarkdown ?? "",
  );
  const [lastSavedPublished, setLastSavedPublished] =
    useState(initialPublished);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 変更があるかどうかをチェック（最後に保存した値と比較）
  const hasChanges =
    currentTitle !== lastSavedTitle ||
    currentThumbnail !== lastSavedThumbnail ||
    currentMarkdown !== lastSavedMarkdown ||
    currentPublished !== lastSavedPublished;

  const clearErrors = useCallback(() => {
    setFieldErrors({});
    setGeneralError(null);
  }, []);

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
    setFieldErrors((prev) =>
      prev.title ? { ...prev, title: undefined } : prev,
    );
  }, []);

  const handleMarkdownChange = useCallback((value: string) => {
    setMarkdown(value);
    setFieldErrors((prev) =>
      prev.article ? { ...prev, article: undefined } : prev,
    );
  }, []);

  const handleThumbnailUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || !files.length) return;

    const file = files[0];
    if (!file) return;

    const presignedURLRes = await client.api.v1.presignedURL.generate.$post({
      json: {
        purpose: "uploadPostImage",
        size: file.size,
        // @ts-expect-error: zodでバリデーションするのでOK
        imageType: file.type,
      },
    });

    if (!presignedURLRes.ok) {
      setGeneralError("サムネイルのアップロードに失敗しました");
      return;
    }

    const { presignedURL, fileURL } = await presignedURLRes.json();

    const r2Res = await fetch(presignedURL, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!r2Res.ok) {
      setGeneralError("サムネイルのアップロードに失敗しました");
      return;
    }

    setThumbnail(fileURL);
    if (fieldErrors.thumbnail) {
      setFieldErrors((prev) => ({ ...prev, thumbnail: undefined }));
    }
  };

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // 画像をアップロードしてマークダウンに挿入する共通処理
  const uploadImageAndInsertToMarkdown = async (
    file: File,
  ): Promise<boolean> => {
    const presignedURLRes = await client.api.v1.presignedURL.generate.$post({
      json: {
        purpose: "uploadPostImage",
        size: file.size,
        // @ts-expect-error: zodでバリデーションするのでOK
        imageType: file.type,
      },
    });

    if (!presignedURLRes.ok) {
      setGeneralError("画像のアップロードに失敗しました");
      return false;
    }

    const { presignedURL, fileURL } = await presignedURLRes.json();

    const r2Res = await fetch(presignedURL, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!r2Res.ok) {
      setGeneralError("画像のアップロードに失敗しました");
      return false;
    }

    // マークダウンに画像を挿入
    const imageMarkdown = `![](${fileURL})`;
    setMarkdown(
      currentMarkdown
        ? `${currentMarkdown}\n\n${imageMarkdown}`
        : imageMarkdown,
    );
    return true;
  };

  const handlePostImageUploadByButton = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const input = e.currentTarget;
    const files = input.files;
    if (!files || !files.length) return;

    const file = files[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      await uploadImageAndInsertToMarkdown(file);
    } finally {
      setIsUploadingImage(false);
      // input要素をリセットして同じファイルを再度選択可能に
      input.value = "";
    }
  };

  const handleDropImage = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (!files || !files.length) return;

    const file = files[0];
    if (!file) return;

    // 画像ファイルかどうかをチェック
    if (!file.type.startsWith("image/")) {
      setGeneralError("画像ファイルのみアップロードできます");
      return;
    }

    setIsUploadingImage(true);
    try {
      await uploadImageAndInsertToMarkdown(file);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const togglePublished = useCallback(() => setPublished((v) => !v), []);

  const toggleShowPreview = useCallback(() => setShowPreview((v) => !v), []);

  const savePost = useCallback(async () => {
    setIsSaving(true);
    clearErrors();

    // クライアントサイドバリデーション（@repo/schemaのZodスキーマを使用）
    const result = UpdatePostBodySchema.safeParse({
      article: currentMarkdown || undefined,
      title: currentTitle || undefined,
      thumbnail: currentThumbnail || undefined,
      published: currentPublished,
    });

    if (!result.success) {
      // クライアント側のバリデーションエラー
      const validationErrors = parseZodError(result.error);
      setFieldErrors(convertToFieldErrors(validationErrors));
      setIsSaving(false);
      return;
    }

    // API リクエスト
    const res = await client.api.v1.posts[":postId"].$patch({
      param: { postId },
      json: result.data,
    });

    if (!res.ok) {
      // サーバーエラーの処理
      try {
        const errorData = await res.json();

        if (errorData.type === "validation") {
          // サーバー側のバリデーションエラー
          setFieldErrors(convertToFieldErrors(errorData.errors));
        } else if (errorData.type === "business") {
          // ビジネスロジックエラー
          setGeneralError(getBusinessErrorMessage(errorData.code));
        }
      } catch {
        setGeneralError("予期しないエラーが発生しました");
      }

      setIsSaving(false);
      return;
    }

    // 成功 - 保存した値を記録
    setLastSavedTitle(currentTitle);
    setLastSavedThumbnail(currentThumbnail);
    setLastSavedMarkdown(currentMarkdown);
    setLastSavedPublished(currentPublished);

    setIsSaving(false);
  }, [
    currentMarkdown,
    currentTitle,
    currentThumbnail,
    currentPublished,
    postId,
    clearErrors,
  ]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await savePost();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        savePost();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [savePost]);

  return {
    currentTitle,
    setTitle: handleTitleChange,
    currentThumbnail,
    handleThumbnailUpload,
    currentMarkdown,
    setMarkdown: handleMarkdownChange,
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
  };
};
