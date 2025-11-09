import { getRpc } from "./rpc-server";

/**
 * Get the current authenticated user from the API
 * Returns null if the user is not authenticated
 */
export async function getCurrentUser() {
  const client = await getRpc();
  const userRes = await client.api.v1.users["@me"].$get();

  if (!userRes.ok) {
    return null;
  }

  const { user } = await userRes.json();
  return user;
}
