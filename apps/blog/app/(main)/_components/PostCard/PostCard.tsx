import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/date";
import { urls } from "@/lib/urls";
import { Tag } from "../Tag";

type Props = {
  id: string;
  title: string;
  date: Date;
  tags: string[];
  thumbnail: string;
};

export const PostCard = ({ id, tags, title, date, thumbnail }: Props) => {
  return (
    <article className="group hover:-translate-y-2 relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-racing-cyan)]/20 bg-[var(--color-dark-elevated)]/80 backdrop-blur-md transition-all duration-300 hover:border-[var(--color-racing-cyan)]/50 hover:shadow-2xl hover:shadow-[var(--color-racing-cyan)]/20">
      {/* Accent corner */}
      <div className="absolute top-0 right-0 h-20 w-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-[var(--color-racing-cyan)] to-transparent" />
        <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-l from-[var(--color-racing-magenta)] to-transparent" />
      </div>

      <Link
        href={urls.postsDetail(id)}
        className="relative h-56 w-full overflow-hidden sm:h-64"
      >
        <Image
          src={thumbnail}
          alt={`Thumbnail: "${title}"`}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-base)]/90 via-transparent to-transparent opacity-60" />

        {/* Speed line overlay on hover */}
        <div className="absolute inset-0 overflow-hidden opacity-0 transition-opacity group-hover:opacity-100">
          <div
            className="absolute top-1/2 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--color-racing-cyan)] to-transparent opacity-50"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-1/3 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--color-racing-magenta)] to-transparent opacity-30"
            style={{ animationDelay: "0.1s" }}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex min-h-8 flex-wrap gap-2">
          {tags.map((tagName) => (
            <Tag name={tagName} key={tagName} />
          ))}
        </div>

        <Link href={urls.postsDetail(id)}>
          <h2 className="mb-4 line-clamp-2 font-bold text-white text-xl transition-all duration-300 group-hover:text-neon-cyan sm:text-2xl">
            {title}
          </h2>
        </Link>

        <div className="mt-auto flex items-center justify-between border-[var(--color-racing-cyan)]/10 border-t pt-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formatDate(date)}</span>
          </div>

          <Link
            href={urls.postsDetail(id)}
            className="inline-flex items-center gap-1 font-medium text-[var(--color-racing-cyan)] transition-all group-hover:gap-2"
          >
            <span>続きを読む</span>
            <svg
              className="h-4 w-4"
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
          </Link>
        </div>
      </div>
    </article>
  );
};
