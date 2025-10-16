import { Hero } from "./_components/Hero";
import { PostCard } from "./_components/PostCard";

const posts = [
  {
    postId: "a",
    tags: ["Web開発", "Frontend"],
    title: "React 19の新機能完全ガイド",
    date: new Date(),
    thumbnailUrl: "https://api.lorem.space/image/game?w=2500&h=1667",
  },
  {
    postId: "b",
    tags: [],
    title: "機械学習モデルの最適化テクニック",
    date: new Date(),
    thumbnailUrl: "https://api.lorem.space/image/game?w=3670&h=2462",
  },
  {
    postId: "c",
    tags: ["クラウド", "Kubernetes", "インフラ"],
    title: "Kubernetesセキュリティのベストプラクティス",
    date: new Date(),
    thumbnailUrl: "https://api.lorem.space/image/game?w=5000&h=3333",
  },
];

export default function Page() {
  return (
    <>
      <Hero />
      <div
        id={"articles"}
        className="mx-auto grid grid-cols-1 gap-8 px-8 py-16 md:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post) => (
          <PostCard key={post.postId} {...post} />
        ))}
      </div>
    </>
  );
}
