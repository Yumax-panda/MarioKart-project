type Props = {
  category: string;
  title: string;
  description: string;
  date: string;
  gradient: string;
};

export const ArticleCard = ({
  category,
  title,
  description,
  date,
  gradient,
}: Props) => {
  return (
    <article className="hover:-translate-y-3 overflow-hidden rounded-2xl border border-teal-400/10 bg-[#1a1a2e]/60 backdrop-blur-lg transition-all hover:border-teal-400/30 hover:shadow-2xl hover:shadow-teal-400/20">
      <div
        className={`h-48 w-full bg-gradient-to-br ${gradient} relative overflow-hidden`}
      >
        <div className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
      <div className="p-6">
        <span className="mb-4 inline-block rounded-full bg-teal-400/10 px-3 py-1 text-sm text-teal-300">
          {category}
        </span>
        <h2 className="mb-2 font-bold text-2xl text-white">{title}</h2>
        <p className="mb-4 text-gray-400 text-sm">{description}</p>
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <span>{date}</span>
          <a
            href="#dummy"
            className="inline-block text-teal-300 transition-transform hover:translate-x-1"
          >
            続きを読む →
          </a>
        </div>
      </div>
    </article>
  );
};
