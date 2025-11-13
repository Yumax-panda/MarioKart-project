import { EmptyPostsState } from "../EmptyPostsState";
import { PostManagementItem } from "../PostManagementItem";

type Post = {
  id: string;
  title: string;
  published: boolean;
  tags: string[];
  updatedAt: string;
};

type Props = {
  posts: Post[];
};

export const PostsList = ({ posts }: Props) => {
  if (posts.length === 0) {
    return <EmptyPostsState />;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostManagementItem
          key={post.id}
          id={post.id}
          title={post.title}
          published={post.published}
          tags={post.tags}
          updatedAt={post.updatedAt}
        />
      ))}
    </div>
  );
};
