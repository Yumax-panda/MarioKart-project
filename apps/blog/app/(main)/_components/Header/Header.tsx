"use client";
import { useAccount } from "context/AccountContext";
import Link from "next/link";
import { urls } from "@/lib/urls";
import { AccountIcon } from "../AccountIcon";

// TODO: fix
export const Header = () => {
  const { account } = useAccount();

  return (
    <header className="border-gray-500 border-b px-4 py-6">
      <nav className="mx-auto flex items-center justify-between">
        <div className="text-2xl">東工大マリオカートサークル</div>
        <ul className="flex gap-8">
          {["ホーム", "記事", "About"].map((item, index) => (
            <li key={item}>
              <Link
                href={`${[urls.index(), urls.post(), urls.about()][index]}`}
                className="group relative text-gray-200 text-lg transition-colors hover:text-teal-300"
              >
                {item}
              </Link>
            </li>
          ))}
          {account ? (
            <AccountIcon
              name={account.name}
              image={account.image || ""}
              onClick={() => {}}
            />
          ) : null}
        </ul>
      </nav>
    </header>
  );
};
