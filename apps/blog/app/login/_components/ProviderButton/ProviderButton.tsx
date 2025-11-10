import Image from "next/image";
import { cn } from "@/lib/css";
import type { SupportedProvider } from "../types";

type ProviderButtonProps = {
  provider: SupportedProvider;
  onClick: () => void;
  disabled?: boolean;
};

export function ProviderButton({
  provider,
  onClick,
  disabled = false,
}: ProviderButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-center gap-3 rounded-lg px-4 py-3 font-medium text-white transition-colors",
        "hover:[background-color:var(--hover-color)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
      //   tailwind CSSはビルド時にクラスを生成するため、ランタイムの動的な値はclassNameで直接扱うことができないためstyle属性で指定している
      style={
        {
          backgroundColor: provider.bgColor,
          "--hover-color": provider.hoverColor,
        } as React.CSSProperties & { "--hover-color": string }
      }
    >
      <Image
        src={provider.iconPath}
        alt={`${provider.name} icon`}
        width={20}
        height={20}
      />
      {provider.name} でログイン
    </button>
  );
}
