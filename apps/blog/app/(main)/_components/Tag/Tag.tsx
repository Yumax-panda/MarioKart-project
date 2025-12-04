type Props = {
  name: string;
};

const tagColors = [
  "from-[var(--color-racing-cyan)] to-[var(--color-racing-magenta)]",
  "from-[var(--color-racing-magenta)] to-[var(--color-racing-purple)]",
  "from-[var(--color-racing-yellow)] to-[var(--color-racing-cyan)]",
];

export const Tag = ({ name }: Props) => {
  // Simple hash function to get consistent color for same tag
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorClass = tagColors[hash % tagColors.length];

  return (
    <span
      className={`relative inline-flex items-center gap-1.5 rounded-md border border-[var(--color-racing-cyan)]/30 bg-gradient-to-r ${colorClass} bg-clip-text px-3 py-1 font-[family-name:var(--font-body)] font-medium text-sm text-transparent transition-all hover:scale-105`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-racing-cyan)]" />
      {name}
    </span>
  );
};
