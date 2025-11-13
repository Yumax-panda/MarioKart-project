import Link from "next/link";
import { urls } from "@/lib/urls";

export const Hero = () => (
  <div className="mx-auto flex px-8 py-16">
    <div className="mx-auto max-w-2xl py-12 text-center">
      <h1 className="mb-4 animate-pulse bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text font-bold text-6xl text-transparent">
        Welcome to TT!
      </h1>
      <p className="mb-8 text-gray-400 text-xl">
        東工大マリオカートサークルの日々のサークル活動の様子を発信します。
      </p>
      <Link
        href={urls.posts()}
        className="hover:-translate-y-1 inline-block rounded-full bg-gradient-to-r from-purple-500 to-purple-700 px-8 py-4 text-white transition-all hover:shadow-2xl hover:shadow-purple-500/50"
      >
        記事を読む
      </Link>
    </div>
  </div>
);
