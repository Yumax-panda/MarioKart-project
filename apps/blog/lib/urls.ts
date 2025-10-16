export const urls = {
  index: () => "/",
  about: () => "/about",
  post: () => "/posts",
  postDetail: (postId: string) => `/posts/${postId}`,
  postDetailEdit: (postId: string) => `/posts/${postId}/edit`,
};
