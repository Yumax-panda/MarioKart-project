"use client";
import Image from "next/image";
import { client } from "@/lib/rpc-browser";

type SupportedProviders = "discord";

export default function OAuthProviderSelection() {
  const handleLogin = (provider: SupportedProviders) => {
    return async () => {
      window.location.href = client.api.auth[provider].login.$url().toString();
    };
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-bold text-3xl text-gray-900">ログイン</h1>
            <p className="text-gray-600">
              プロバイダーを選択してログインしてください
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogin("discord")}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#5865F2] px-4 py-3 font-medium text-white transition-colors hover:bg-[#4752C4]"
          >
            <Image
              src="/discord.svg"
              alt="discord icon"
              width={20}
              height={20}
            />
            Discord でログイン
          </button>

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>初めての利用の場合は自動的にアカウントが作成されます</p>
          </div>
        </div>
      </div>
    </div>
  );
}
