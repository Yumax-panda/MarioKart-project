"use client";

import Image from "next/image";
import Link from "next/link";
import { urls } from "@/lib/urls";
import { useAccountIcon } from "./hooks/useAccountIcon";

type Props = {
  name: string;
  image: string;
};

export const AccountIcon = ({ name, image }: Props) => {
  const { isOpen, setIsOpen, menuRef, handleLogout } = useAccountIcon();

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-2 transition-colors hover:bg-gray-100"
      >
        <Image
          src={image}
          alt={name}
          width={32}
          height={32}
          className="rounded-full border-2 border-gray-300"
        />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 z-50 min-w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="py-1">
            <Link
              href={urls.settingsPosts()}
              className="block px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              記事の管理
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-gray-700 text-sm transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ログアウト
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
