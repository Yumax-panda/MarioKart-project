export type PostsSearchParams = {
  userId?: string;
};

export type PostsPageSearchParams = PostsSearchParams & {
  page?: string;
};

export const urls = {
  index: () => "/",
  about: () => "/about",
  posts: (searchParams?: PostsPageSearchParams): string => {
    const basePath = "/posts";

    if (!searchParams || Object.keys(searchParams).length === 0) {
      return basePath;
    }
    const params = new URLSearchParams(searchParams);
    return `${basePath}?${params.toString()}`;
  },
  postsDetail: (postId: string) => `/posts/${postId}`,
  postsDetailEdit: (postId: string) => `/posts/${postId}/edit`,
  settingsPosts: () => "/settings/posts",
};
