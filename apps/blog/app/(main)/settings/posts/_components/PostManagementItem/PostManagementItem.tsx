import Link from "next/link";
import { cn } from "@/lib/css";
import { formatDate } from "@/lib/date";
import { urls } from "@/lib/urls";
import { Tag } from "../../../../_components/Tag";

type Props = {
  id: string;
  title: string;
  published: boolean;
  tags: string[];
  updatedAt: string;
};

export const PostManagementItem = ({
  id,
  title,
  published,
  tags,
  updatedAt,
}: Props) => {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800/50 p-4 transition-colors hover:border-gray-600 hover:bg-gray-800/70 sm:flex-row sm:items-start sm:justify-between sm:p-6">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href={urls.postsDetail(id)}
            className="font-semibold text-base text-blue-400 hover:text-blue-300 hover:underline sm:text-lg"
          >
            {title}
          </Link>
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs",
              published
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-gray-500/30 bg-gray-500/10 text-gray-400",
            )}
          >
            {published ? "公開" : "下書き"}
          </span>
        </div>

        <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-4">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tagName) => (
                <Tag name={tagName} key={tagName} />
              ))}
            </div>
          )}
          <span className="text-gray-500 text-xs sm:text-sm">
            更新: {formatDate(new Date(updatedAt))}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={urls.postsDetailEdit(id)}
          className="flex-1 rounded-lg border border-gray-600 bg-gray-700/50 px-3 py-2 text-center text-gray-300 text-sm transition-colors hover:border-gray-500 hover:bg-gray-700 sm:flex-none sm:px-4"
        >
          編集
        </Link>
        <button
          type="button"
          className="flex-1 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-400 text-sm transition-colors hover:border-red-500/50 hover:bg-red-500/20 sm:flex-none sm:px-4"
        >
          削除
        </button>
      </div>
    </article>
  );
};
