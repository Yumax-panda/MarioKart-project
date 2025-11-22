import { ArrowLeftIcon } from "app/_components/Icon/ArrowLeftIcon";
import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export const BackButton = ({ href, label }: Props) => (
  <Link
    href={href}
    className="group relative flex size-10 items-center justify-center rounded-full bg-gray-700 text-white transition-all hover:scale-110 hover:bg-gray-600"
    aria-label={label}
  >
    <ArrowLeftIcon />
    <span className="-translate-x-1/2 pointer-events-none absolute top-full left-1/2 mt-2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-white text-xs opacity-0 transition-opacity group-hover:opacity-100">
      {label}
    </span>
  </Link>
);
