import Link from "next/link";
import { urls } from "@/lib/urls";

export const Hero = () => (
  <div className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32">
    {/* Diagonal accent stripes */}
    <div className="pointer-events-none absolute inset-0 opacity-20">
      <div className="absolute top-0 right-1/4 h-[400px] w-1 rotate-12 bg-gradient-to-b from-[var(--color-racing-cyan)] to-transparent" />
      <div className="absolute top-20 right-1/3 h-[500px] w-1 rotate-12 bg-gradient-to-b from-[var(--color-racing-magenta)] to-transparent" />
      <div className="-rotate-12 absolute top-10 left-1/4 h-[450px] w-1 bg-gradient-to-b from-[var(--color-racing-yellow)] to-transparent" />
    </div>

    <div className="relative z-10 mx-auto max-w-5xl">
      <div className="text-center">
        {/* Animated badge */}
        <div className="mb-8 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-[var(--color-racing-cyan)]/30 bg-[var(--color-dark-elevated)]/50 px-4 py-2 backdrop-blur-sm">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-racing-cyan)]" />
          <span className="font-[family-name:var(--font-body)] text-gray-300 text-sm">
            東工大マリオカートサークル
          </span>
        </div>

        {/* Main heading with staggered animation */}
        <h1
          className="mb-6 animate-fade-in-up font-[family-name:var(--font-display)] font-bold text-5xl text-white sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="inline-block bg-gradient-to-r from-[var(--color-racing-cyan)] via-[var(--color-racing-magenta)] to-[var(--color-racing-yellow)] bg-clip-text text-transparent">
            Welcome to TT !
          </span>
        </h1>

        <p
          className="mx-auto mb-12 max-w-2xl animate-fade-in-up font-[family-name:var(--font-body)] text-gray-400 text-lg leading-relaxed sm:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          チームTTは、東京科学大学で活動するマリオカート同好会です。
          <br />
          学年にとらわれずメンバー同士仲良く日々の活動に励んでいます。
        </p>

        {/* CTA buttons */}
        <div
          className="flex animate-fade-in-scale flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.4s" }}
        >
          <Link
            href={urls.posts()}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[var(--color-racing-cyan)] to-[var(--color-racing-magenta)] px-8 py-4 font-[family-name:var(--font-body)] font-semibold text-lg text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-racing-cyan)]/50"
          >
            <span className="relative z-10">記事を読む</span>
            <svg
              className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <div className="-z-10 absolute inset-0 bg-gradient-to-r from-[var(--color-racing-magenta)] to-[var(--color-racing-cyan)] opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>

          <Link
            href={urls.about()}
            className="group inline-flex items-center gap-2 rounded-lg border border-[var(--color-racing-cyan)]/30 bg-transparent px-8 py-4 font-[family-name:var(--font-body)] font-semibold text-lg text-white transition-all hover:scale-105 hover:border-[var(--color-racing-cyan)] hover:bg-[var(--color-racing-cyan)]/10"
          >
            <span>もっと詳しく！</span>
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>

    {/* Bottom gradient fade */}
    <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[var(--color-dark-base)] to-transparent" />
  </div>
);
