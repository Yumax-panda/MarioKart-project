import { CreatePostButton } from "./CreatePostButton";

export const PostsManagementHeader = () => {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <h1 className="font-bold text-2xl text-white sm:text-3xl">記事の管理</h1>
      <CreatePostButton />
    </div>
  );
};
