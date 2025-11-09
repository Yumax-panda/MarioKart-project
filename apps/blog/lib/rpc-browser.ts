import { getTypedClient } from "api/lib/rpc";

export const client = getTypedClient(
  process.env.NEXT_PUBLIC_API_URL as string,
  {
    init: {
      credentials: "include",
    },
  },
);
