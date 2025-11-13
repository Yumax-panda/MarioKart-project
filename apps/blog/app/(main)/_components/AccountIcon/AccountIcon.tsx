"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { urls } from "@/lib/urls";

type Props = {
  name: string;
  image: string;
};

// TODO: LinkのonClickを修正
export const AccountIcon = ({ name, image }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
            <Link
              href="/logout"
              className="block px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              ログアウト
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
