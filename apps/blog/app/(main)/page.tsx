import { ArticleCard } from "./_components/ArticleCard";

const Hero = () => {
  return (
    <div className="mx-auto px-8 py-16">
      <div className="py-12 text-center">
        <h1 className="mb-4 animate-pulse bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text font-bold text-6xl text-transparent">
          最新技術を探求する
        </h1>
        <p className="mb-8 text-gray-400 text-xl">
          革新的な技術トレンドと開発のベストプラクティスをお届けします
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
  const articles = [
    {
      category: "Web開発",
      title: "React 19の新機能完全ガイド",
      description:
        "最新のReact 19で導入された革新的な機能とパフォーマンス改善について詳しく解説します。",
      date: "2025年10月8日",
      gradient: "from-purple-500 to-purple-700",
    },
    {
      category: "AI/ML",
      title: "機械学習モデルの最適化テクニック",
      description:
        "本番環境での機械学習モデルのパフォーマンスを最大化するための実践的なアプローチを紹介します。",
      date: "2025年10月5日",
      gradient: "from-purple-500 to-purple-700",
    },
    {
      category: "クラウド",
      title: "Kubernetesセキュリティのベストプラクティス",
      description:
        "エンタープライズレベルのKubernetesクラスターを安全に運用するための重要なポイントを解説します。",
      date: "2025年10月2日",
      gradient: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <div
      id={"articles"}
      className="mx-auto grid grid-cols-1 gap-8 px-8 py-16 md:grid-cols-2 lg:grid-cols-3"
    >
      {articles.map((article) => (
        <ArticleCard key={article.title} {...article} />
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
