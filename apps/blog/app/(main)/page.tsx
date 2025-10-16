import { PostCard } from "./_components/PostCard";

const Hero = () => {
  return (
    <div className="mx-auto flex px-8 py-16">
      <div className="mx-auto max-w-2xl py-12 text-center">
        <h1 className="mb-4 animate-pulse bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text font-bold text-6xl text-transparent">
          Welcome to TT!
        </h1>
        <p className="mb-8 text-gray-400 text-xl">
          東工大マリオカートサークルの日々のサークル活動の様子を発信します。
        </p>
        <a
          href="#articles"
          className="hover:-translate-y-1 inline-block rounded-full bg-gradient-to-r from-purple-500 to-purple-700 px-8 py-4 text-white transition-all hover:shadow-2xl hover:shadow-purple-500/50"
        >
          記事を読む
        </a>
      </div>
    </div>
  );
};

// Articles Grid Component
const ArticlesGrid = () => {
  const posts = [
    {
      postId: "a",
      tags: ["Web開発"],
      title: "React 19の新機能完全ガイド",
      date: new Date(),
      thumbnailUrl: "https://picsum.photos/id/10/2500/1667",
    },
    {
      postId: "b",
      tags: ["AI/ML"],
      title: "機械学習モデルの最適化テクニック",
      date: new Date(),
      thumbnailUrl: "https://picsum.photos/id/10/2500/1667",
    },
    {
      postId: "c",
      tags: ["クラウド"],
      title: "Kubernetesセキュリティのベストプラクティス",
      date: new Date(),
      thumbnailUrl: "https://picsum.photos/id/10/2500/1667",
    },
  ];

  return (
    <div
      id={"articles"}
      className="mx-auto grid grid-cols-1 gap-8 px-8 py-16 md:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <PostCard key={post.postId} {...post} />
      ))}
    </div>
  );
};

// Main App Component
export default function Page() {
  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
      <Hero />
      <ArticlesGrid />
    </div>
  );
}
