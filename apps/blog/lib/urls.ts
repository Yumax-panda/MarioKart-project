/**
 * Search parameters for posts listing page
 */
export type PostsSearchParams = {
  userId?: string;
};

/**
 * Search parameters for posts page including pagination
 */
export type PostsPageSearchParams = PostsSearchParams & {
  page?: string;
};

/**
 * Build a URL with pagination and search parameters
 */
export const buildPaginationUrl = (
  basePath: string,
  page: number,
  searchParams: Record<string, string> = {},
): string => {
  const params = new URLSearchParams({
    ...searchParams,
    page: page.toString(),
  });
  return `${basePath}?${params.toString()}`;
};

const postUrl = (page?: number, searchParams?: PostsSearchParams): string => {
  if (page === undefined) {
    return "/posts";
  }
  return buildPaginationUrl("/posts", page, searchParams);
};

export const urls = {
  index: () => "/",
  about: () => "/about",
  post: postUrl,
  postDetail: (postId: string) => `/posts/${postId}`,
  postDetailEdit: (postId: string) => `/posts/${postId}/edit`,
  settingsPosts: () => "/settings/posts",
};
