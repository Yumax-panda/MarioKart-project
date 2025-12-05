"use client";
import { useAccount } from "context/AccountContext";
import Link from "next/link";
import { useState } from "react";
import { urls } from "@/lib/urls";
import { AccountIcon } from "../AccountIcon";

export const Header = () => {
  const { account } = useAccount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "ホーム", url: urls.index() },
    { label: "記事", url: urls.posts() },
    { label: "About", url: urls.about() },
  ];

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

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-6 sm:flex lg:gap-10">
          {navItems.map(({ label, url }, index) => (
            <li key={label}>
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

        {/* Mobile Menu Button & Account Icon */}
        <div className="flex items-center gap-4 sm:hidden">
          {account ? (
            <AccountIcon name={account.name} image={account.image || ""} />
          ) : null}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-[var(--color-racing-cyan)]/30 bg-[var(--color-dark-elevated)]/60 p-2.5 text-gray-300 backdrop-blur-md transition-all hover:border-[var(--color-racing-cyan)] hover:bg-[var(--color-racing-cyan)]/10"
            aria-label="メニューを開く"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mt-6 border-[var(--color-racing-cyan)]/20 border-t pt-6 sm:hidden">
          <ul className="flex flex-col gap-4">
            {navItems.map(({ label, url }) => (
              <li key={label}>
                <Link
                  href={url}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group block rounded-lg border border-[var(--color-racing-cyan)]/20 bg-[var(--color-dark-elevated)]/60 px-4 py-3 font-[family-name:var(--font-body)] font-medium text-gray-300 text-lg transition-all hover:border-[var(--color-racing-cyan)] hover:bg-[var(--color-racing-cyan)]/10 hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
