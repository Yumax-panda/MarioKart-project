export const urls = {
  index: () => "/",
  about: () => "/about",
  post: (page?: number, searchParams?: Record<string, string>) => {
    if (page === undefined) {
      return "/posts";
    }
    return buildPaginationUrl("/posts", page, searchParams);
  },
  postDetail: (postId: string) => `/posts/${postId}`,
  postDetailEdit: (postId: string) => `/posts/${postId}/edit`,
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
