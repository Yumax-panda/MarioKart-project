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
    <article className="hover:-translate-y-2 flex h-full flex-col overflow-hidden rounded-2xl border border-teal-400/10 bg-[#1a1a2e]/60 backdrop-blur-lg transition-all hover:border-teal-400/30 hover:shadow-2xl hover:shadow-teal-400/20">
      <Link
        href={urls.postDetail(id)}
        className="relative h-56 w-full overflow-hidden sm:h-64"
      >
        <Image
          src={thumbnail}
          alt={`Thumbnail: "${title}"`}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex min-h-8 flex-wrap gap-2">
          {tags.map((tagName) => (
            <Tag name={tagName} key={tagName} />
          ))}
        </div>
        <Link href={urls.postDetail(id)}>
          <h2 className="mb-4 line-clamp-2 font-bold text-white text-xl transition-colors hover:text-teal-300 sm:text-2xl">
            {title}
          </h2>
        </Link>
        <div className="mt-auto flex items-center justify-between text-gray-500 text-sm">
          <span>{formatDate(date)}</span>
          <Link
            href={urls.postDetail(id)}
            className="inline-block text-teal-300 transition-transform hover:translate-x-1"
          >
            続きを読む →
          </Link>
        </div>
      </div>
    </article>
  );
};
