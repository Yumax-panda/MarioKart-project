import type {
  ApiErrorResponse,
  BusinessErrorCode,
} from "@repo/schema/errorCodes";
import { parseZodError } from "@repo/schema/zodErrorMapper";

// バリデーションエラーレスポンスを作成
export function createValidationErrorResponse(zodError: {
  issues: unknown[];
}): ApiErrorResponse {
  return {
    type: "validation",
    errors: parseZodError(zodError as never),
  };
}

// ビジネスロジックエラーレスポンスを作成
export function createBusinessErrorResponse(
  code: BusinessErrorCode,
): ApiErrorResponse {
  return {
    type: "business",
    code,
  };
}
