"use client";
import { SUPPORTED_PROVIDERS, useLogin } from "./_components/hooks/useLogin";
import { ProviderButton } from "./_components/ProviderButton";

export default function OAuthProviderSelection() {
  const { handleLogin } = useLogin();

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

          <div className="flex flex-col gap-3">
            {SUPPORTED_PROVIDERS.map((provider) => (
              <ProviderButton
                key={provider.id}
                provider={provider}
                onClick={handleLogin(provider.id)}
              />
            ))}
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>初めての利用の場合は自動的にアカウントが作成されます</p>
          </div>
        </div>
      </div>
    </div>
  );
}
