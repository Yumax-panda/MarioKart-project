export const Header = () => {
  return (
    <header className="border-teal-400/10 border-b bg-[#0f0f23]/80 backdrop-blur-lg">
      <nav className="mx-auto flex items-center justify-between px-8 py-6">
        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text font-bold text-2xl text-transparent">
          Tech Insights
        </div>
        <ul className="flex gap-8">
          {["ホーム", "記事", "About", "Contact"].map((item, index) => (
            <li key={item}>
              <a
                href={`#${["home", "articles", "about", "contact"][index]}`}
                className="group relative text-gray-200 transition-colors hover:text-teal-300"
              >
                {item}
                <span className="h-0.5 w-0 bg-teal-300 transition-all group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
