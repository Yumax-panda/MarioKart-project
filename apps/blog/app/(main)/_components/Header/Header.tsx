"use client";
import { useAccount } from "context/AccountContext";
import Link from "next/link";
import { urls } from "@/lib/urls";
import { AccountIcon } from "../AccountIcon";

export const Header = () => {
  const { account } = useAccount();

  return (
    <header className="relative z-20 border-[var(--color-racing-cyan)]/20 border-b px-6 py-6 backdrop-blur-md lg:px-8">
      {/* Speed line decoration */}
      <div className="absolute top-0 left-0 h-[2px] w-full overflow-hidden">
        <div className="absolute h-full w-1/3 animate-speed-line bg-gradient-to-r from-transparent via-[var(--color-racing-cyan)] to-transparent" />
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href={urls.index()} className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-racing-cyan)] to-[var(--color-racing-magenta)] font-bold text-lg text-white transition-transform group-hover:scale-110">
            TT
          </div>
          <div>
            <div className="font-[family-name:var(--font-display)] font-bold text-lg text-white transition-colors group-hover:text-neon-cyan sm:text-xl">
              TT
            </div>
            <div className="font-[family-name:var(--font-body)] text-gray-400 text-xs">
              東工大マリオカートサークル
            </div>
          </div>
        </Link>

        <ul className="flex items-center gap-6 lg:gap-10">
          {[
            { label: "ホーム", url: urls.index() },
            { label: "記事", url: urls.posts() },
            { label: "About", url: urls.about() },
          ].map(({ label, url }, index) => (
            <li key={label} className="hidden sm:block">
              <Link
                href={url}
                className="group relative inline-block font-[family-name:var(--font-body)] font-medium text-gray-300 text-lg transition-all hover:text-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{label}</span>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[var(--color-racing-cyan)] to-[var(--color-racing-magenta)] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
          {account ? (
            <li>
              <AccountIcon name={account.name} image={account.image || ""} />
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};
