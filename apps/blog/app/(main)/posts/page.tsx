import { notFound } from "next/navigation";
import { getRpc } from "@/lib/rpc-server";
import { type PostsPageSearchParams, urls } from "@/lib/urls";
import { Pagination } from "../_components/Pagination";
import { PostCard } from "../_components/PostCard";

const POSTS_PER_PAGE = 12;

type Props = {
  searchParams: Promise<PostsPageSearchParams>;
};

export default async function PostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = params.page ? Number.parseInt(params.page, 10) : 1;
  const rpc = await getRpc();

  const res = await rpc.api.v1.posts.$get({
    query: {
      page: currentPage.toString(),
      perPage: POSTS_PER_PAGE.toString(),
      ...(params.userId && { userId: params.userId }),
    },
  });

  if (!res.ok) notFound();

  const { posts, totalCount } = await res.json();

  if (!posts.length) notFound();

  return (
    <div className="relative">
      {/* Page header */}
      <div className="relative overflow-hidden border-[var(--color-racing-cyan)]/20 border-b px-6 py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-10 right-1/4 h-[2px] w-32 rotate-12 bg-gradient-to-r from-transparent via-[var(--color-racing-cyan)] to-transparent" />
          <div className="-rotate-12 absolute top-20 left-1/3 h-[2px] w-24 bg-gradient-to-r from-transparent via-[var(--color-racing-magenta)] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h1 className="mb-4 animate-fade-in-up font-[family-name:var(--font-display)] font-bold text-4xl text-white sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-[var(--color-racing-cyan)] to-[var(--color-racing-magenta)] bg-clip-text text-transparent">
              All Posts
            </span>
          </h1>
          <p
            className="animate-fade-in-up font-[family-name:var(--font-body)] text-gray-400 text-lg"
            style={{ animationDelay: "0.1s" }}
          >
            サークル活動の記録とレースの熱い戦いをチェック
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(({ updatedAt, ...rest }, index) => (
            <div
              key={rest.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <PostCard {...rest} date={new Date(updatedAt)} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          perPage={POSTS_PER_PAGE}
          buildUrl={(page) =>
            urls.posts({
              page: page.toString(),
              ...(params.userId && { userId: params.userId }),
            })
          }
        />
      </div>
    </div>
  );
}
