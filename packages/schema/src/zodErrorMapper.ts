import type { ZodError, ZodIssue } from "zod";
import {
  type ValidationErrorCode,
  ValidationErrorCodes,
  type ValidationErrorDetail,
} from "./errorCodes";

// Zodのissue.codeを統一されたエラーコードにマッピング
function mapZodIssueCode(code: ZodIssue["code"]): ValidationErrorCode {
  switch (code) {
    case "invalid_type":
      return ValidationErrorCodes.INVALID_TYPE;
    case "too_small":
      return ValidationErrorCodes.TOO_SHORT;
    case "too_big":
      return ValidationErrorCodes.TOO_LONG;
    default:
      return ValidationErrorCodes.INVALID_TYPE;
  }
}

// ZodErrorを構造化されたエラー詳細に変換（クライアント・サーバー共通）
export function parseZodError(error: ZodError): ValidationErrorDetail[] {
  return error.issues.map((issue) => {
    const detail: ValidationErrorDetail = {
      field: issue.path.join("."),
      code: mapZodIssueCode(issue.code),
    };

    // メタ情報の抽出
    if (issue.code === "too_big") {
      if ("maximum" in issue) {
        detail.meta = { maximum: issue.maximum as number };
      }
      if ("type" in issue && issue.type === "array") {
        detail.code = ValidationErrorCodes.ARRAY_TOO_BIG;
      }
    } else if (issue.code === "too_small") {
      if ("minimum" in issue) {
        detail.meta = { minimum: issue.minimum as number };
      }
      if ("type" in issue && issue.type === "array") {
        detail.code = ValidationErrorCodes.ARRAY_TOO_SMALL;
      }
    } else if (issue.code === "invalid_type") {
      if ("expected" in issue) {
        const expected = issue.expected;
        if (expected === "string" || expected === "number") {
          detail.code = ValidationErrorCodes.REQUIRED;
        }
      }
    }

    // URLバリデーションエラーの特別処理
    if ("validation" in issue && issue.validation === "url") {
      detail.code = ValidationErrorCodes.INVALID_URL;
    }

    return detail;
  });
}

// クライアント側でフィールドごとのエラーマップを作成する際に使用
export function groupErrorsByField(
  errors: ValidationErrorDetail[],
): Record<string, ValidationErrorDetail> {
  const grouped: Record<string, ValidationErrorDetail> = {};
  for (const error of errors) {
    if (!grouped[error.field]) {
      grouped[error.field] = error;
    }
  }
  return grouped;
}
