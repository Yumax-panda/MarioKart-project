export const Footer = () => {
  return (
    <footer className="relative z-20 border-[var(--color-racing-cyan)]/20 border-t px-6 py-12 backdrop-blur-md">
      {/* Speed line decoration */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
        <div className="absolute h-full w-1/3 animate-speed-line bg-gradient-to-r from-transparent via-[var(--color-racing-magenta)] to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <div className="mb-2 font-[family-name:var(--font-display)] font-bold text-lg text-white">
              TT
            </div>
            <p className="text-gray-400 text-sm">東工大マリオカートサークル</p>
          </div>

          <div className="flex items-center gap-2 font-[family-name:var(--font-body)] text-gray-400 text-sm">
            <div className="h-1 w-8 bg-gradient-to-r from-[var(--color-racing-cyan)] to-transparent" />
            <span>&copy; 2024 All rights reserved</span>
            <div className="h-1 w-8 bg-gradient-to-l from-[var(--color-racing-magenta)] to-transparent" />
          </div>
        </div>
      </div>
    </footer>
  );
};
