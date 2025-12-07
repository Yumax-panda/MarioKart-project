import { getTypedClient } from "api/lib/rpc";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";

/**
 * Get a typed RPC client for server components with automatic cookie forwarding
 * This should only be used in Server Components, Server Actions, or Route Handlers
 */
export async function getRpc() {
  // Opt into dynamic rendering
  noStore();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("[getRpc] NEXT_PUBLIC_API_URL is not set");
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Please check environment variables.",
    );
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  console.log("[getRpc] API URL:", apiUrl);
  console.log("[getRpc] Cookie count:", cookieStore.getAll().length);
  console.log("[getRpc] Has session cookie:", cookieHeader.includes("session_id"));

  return getTypedClient(apiUrl, {
    headers: {
      Cookie: cookieHeader,
    },
  });
}
