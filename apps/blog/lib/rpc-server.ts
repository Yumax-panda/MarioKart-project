import { getTypedClient } from "api/lib/rpc";
import { cookies } from "next/headers";

/**
 * Get a typed RPC client for server components with automatic cookie forwarding
 * This should only be used in Server Components, Server Actions, or Route Handlers
 */
export async function getRpc() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return getTypedClient(process.env.NEXT_PUBLIC_API_URL as string, {
    headers: {
      Cookie: cookieHeader,
    },
  });
}
