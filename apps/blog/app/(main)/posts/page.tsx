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
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(({ updatedAt, ...rest }) => (
          <PostCard key={rest.id} {...rest} date={new Date(updatedAt)} />
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
  );
}
