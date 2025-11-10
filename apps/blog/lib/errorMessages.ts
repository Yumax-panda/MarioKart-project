import {
  BusinessErrorCodes,
  ValidationErrorCodes,
  type ValidationErrorDetail,
} from "@repo/schema/errorCodes";

// フィールドとエラーコードからメッセージを生成
export function getValidationErrorMessage(
  error: ValidationErrorDetail,
): string {
  const { field, code, meta } = error;

  // フィールド別のメッセージマッピング
  const messageMap: Record<
    string,
    Record<string, string | ((meta?: (typeof error)["meta"]) => string)>
  > = {
    title: {
      [ValidationErrorCodes.REQUIRED]: "タイトルを入力してください",
      [ValidationErrorCodes.TOO_LONG]: (meta) =>
        `タイトルは${meta?.maximum || 255}文字以内で入力してください`,
      [ValidationErrorCodes.TOO_SHORT]: "タイトルを入力してください",
      [ValidationErrorCodes.INVALID_TYPE]: "タイトルを入力してください",
    },
    article: {
      [ValidationErrorCodes.REQUIRED]: "記事の内容を入力してください",
      [ValidationErrorCodes.TOO_LONG]: (meta) =>
        `記事は${meta?.maximum || 50000}文字以内で入力してください`,
      [ValidationErrorCodes.TOO_SHORT]: "記事の内容を入力してください",
      [ValidationErrorCodes.INVALID_TYPE]: "記事の内容を入力してください",
    },
    thumbnail: {
      [ValidationErrorCodes.REQUIRED]: "サムネイル画像を設定してください",
      [ValidationErrorCodes.INVALID_URL]:
        "有効なサムネイル画像URLを指定してください",
      [ValidationErrorCodes.INVALID_TYPE]: "サムネイル画像を設定してください",
    },
    tags: {
      [ValidationErrorCodes.ARRAY_TOO_BIG]: (meta) =>
        `タグは${meta?.maximum || 5}個まで設定できます`,
    },
  };

  // メッセージを取得
  const fieldMessages = messageMap[field];
  if (fieldMessages?.[code]) {
    const message = fieldMessages[code];
    return typeof message === "function" ? message(meta) : message;
  }

  // デフォルトメッセージ
  return "入力内容を確認してください";
}

// ビジネスエラーのメッセージ
export function getBusinessErrorMessage(code: string): string {
  const messageMap: Record<string, string> = {
    [BusinessErrorCodes.POST_NOT_FOUND]: "記事が見つかりません",
    [BusinessErrorCodes.POST_FORBIDDEN]: "この記事を編集する権限がありません",
    [BusinessErrorCodes.POST_TITLE_DUPLICATE]:
      "同じタイトルの記事がすでに存在します",
    [BusinessErrorCodes.UNAUTHORIZED]: "ログインが必要です",
    [BusinessErrorCodes.FORBIDDEN]: "アクセス権限がありません",
    [BusinessErrorCodes.INTERNAL_SERVER_ERROR]:
      "サーバーエラーが発生しました。時間をおいて再度お試しください",
  };

  return messageMap[code] || "エラーが発生しました";
}
