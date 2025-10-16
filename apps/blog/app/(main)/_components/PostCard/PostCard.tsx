import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/date";
import { urls } from "@/lib/urls";
import { Tag } from "../Tag";

type Props = {
  postId: string;
  title: string;
  date: Date;
  tags: string[];
  thumbnailUrl: string;
};

export const PostCard = ({
  postId,
  tags,
  title,
  date,
  thumbnailUrl,
}: Props) => {
  return (
    <article className="hover:-translate-y-3 max-w-md overflow-hidden rounded-2xl border border-teal-400/10 bg-[#1a1a2e]/60 backdrop-blur-lg transition-all hover:border-teal-400/30 hover:shadow-2xl hover:shadow-teal-400/20">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={`Thumbnail: "${title}"`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div>
          {tags.map((tagName) => (
            <Tag name={tagName} key={tagName} />
          ))}
        </div>
        <h2 className="mb-2 font-bold text-2xl text-white">{title}</h2>
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <span>{formatDate(date)}</span>
          <Link
            href={urls.postDetail(postId)}
            className="inline-block text-teal-300 transition-transform hover:translate-x-1"
          >
            続きを読む →
          </Link>
        </div>
      </div>
    </article>
  );
};
