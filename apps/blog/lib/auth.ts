import { cookies } from "next/headers";
import { client } from "./client";

/**
 * Get cookie header string from Next.js cookies for API requests
 */
export async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

/**
 * Get the current authenticated user from the API
 * Returns null if the user is not authenticated
 */
export async function getCurrentUser() {
  const cookieHeader = await getCookieHeader();

  const userRes = await client.api.v1.users["@me"].$get(undefined, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!userRes.ok) {
    return null;
  }

  const { user } = await userRes.json();
  return user;
}
