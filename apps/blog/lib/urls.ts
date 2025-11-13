export type PostsSearchParams = {
  userId?: string;
};

export type PostsPageSearchParams = PostsSearchParams & {
  page?: string;
};

export const urls = {
  index: () => "/",
  about: () => "/about",
  posts: (page?: number, searchParams?: PostsSearchParams): string => {
    if (page === undefined) {
      return "/posts";
    }
    const params = new URLSearchParams({
      ...searchParams,
      page: page.toString(),
    });
    return `/posts?${params.toString()}`;
  },
  postsDetail: (postId: string) => `/posts/${postId}`,
  postsDetailEdit: (postId: string) => `/posts/${postId}/edit`,
  settingsPosts: () => "/settings/posts",
};
