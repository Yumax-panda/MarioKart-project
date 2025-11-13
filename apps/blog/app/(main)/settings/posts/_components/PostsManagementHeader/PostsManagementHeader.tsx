import { CreatePostButton } from "./CreatePostButton";

export const PostsManagementHeader = () => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="font-bold text-3xl text-white">記事の管理</h1>
      <CreatePostButton />
    </div>
  );
};
