import { getRpc } from "./rpc-server";

/**
 * Get the current authenticated user from the API
 * Returns null if the user is not authenticated
 */
export async function getCurrentUser() {
  try {
    const client = await getRpc();
    const userRes = await client.api.v1.users["@me"].$get();

    console.log("[getCurrentUser] Response status:", userRes.status);

    if (!userRes.ok) {
      // 詳細なエラーログ
      const errorText = await userRes
        .text()
        .catch(() => "Unable to read error");
      console.error("[getCurrentUser] Failed:", {
        status: userRes.status,
        statusText: userRes.statusText,
        error: errorText,
      });
      return null;
    }

    const { user } = await userRes.json();
    console.log(
      "[getCurrentUser] Success:",
      user?.id ? `User ${user.id}` : "No user",
    );
    return user;
  } catch (error) {
    console.error("[getCurrentUser] Exception:", error);
    return null;
  }
}
