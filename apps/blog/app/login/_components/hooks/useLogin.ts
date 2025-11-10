import { client } from "@/lib/rpc-browser";
import type { SupportedProvider, SupportedProviderID } from "../types";

export const SUPPORTED_PROVIDERS: SupportedProvider[] = [
  {
    id: "discord",
    name: "Discord",
    iconPath: "/discord.svg",
    bgColor: "#5865F2",
    hoverColor: "#4752C4",
  },
];

export function useLogin() {
  const handleLogin = (provider: SupportedProviderID) => {
    return async () => {
      window.location.href = client.api.auth[provider].login.$url().toString();
    };
  };

  return {
    handleLogin,
  };
}
