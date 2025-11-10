import { getTypedClient } from "api/lib/rpc";

// サーバーでも動くが、ログイン必須のリソースへはアクセスできない
// (Webサーバー -> APIへのリクエストではcookieが設定されていないため)
export const client = getTypedClient(
  process.env.NEXT_PUBLIC_API_URL as string,
  {
    init: {
      credentials: "include",
    },
  },
);
