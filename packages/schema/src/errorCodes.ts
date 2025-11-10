export const ValidationErrorCodes = {
  // 共通
  REQUIRED: "required",
  INVALID_TYPE: "invalid_type",

  // 文字列
  TOO_SHORT: "too_short",
  TOO_LONG: "too_long",

  // URL
  INVALID_URL: "invalid_url",

  // 配列
  ARRAY_TOO_SMALL: "array_too_small",
  ARRAY_TOO_BIG: "array_too_big",
} as const;

export type ValidationErrorCode =
  (typeof ValidationErrorCodes)[keyof typeof ValidationErrorCodes];

// ビジネスロジックエラー
export const BusinessErrorCodes = {
  POST_NOT_FOUND: "POST_NOT_FOUND",
  POST_FORBIDDEN: "POST_FORBIDDEN",
  POST_TITLE_DUPLICATE: "POST_TITLE_DUPLICATE",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type BusinessErrorCode =
  (typeof BusinessErrorCodes)[keyof typeof BusinessErrorCodes];

// バリデーションエラーの詳細構造
export type ValidationErrorDetail = {
  field: string;
  code: ValidationErrorCode;
  meta?: {
    maximum?: number;
    minimum?: number;
    expected?: string;
    received?: string;
  };
};

// APIエラーレスポンスの統一形式
export type ApiErrorResponse =
  | {
      // バリデーションエラーの場合
      type: "validation";
      errors: ValidationErrorDetail[];
    }
  | {
      // ビジネスロジックエラーの場合
      type: "business";
      code: BusinessErrorCode;
    };
