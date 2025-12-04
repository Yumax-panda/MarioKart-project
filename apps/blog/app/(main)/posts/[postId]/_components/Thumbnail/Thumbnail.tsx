import Image from "next/image";
import { memo } from "react";

type Props = {
  title: string;
  src: string;
};

export const Thumbnail = memo(({ src, title }: Props) => {
  return (
    <div className="not-prose group relative h-80 w-full animate-fade-in-scale overflow-hidden rounded-xl border border-[var(--color-racing-cyan)]/20 shadow-2xl shadow-[var(--color-racing-cyan)]/10">
      <Image
        src={src}
        alt={`Thumbnail: ${title}`}
        className="object-cover transition-all duration-700 group-hover:scale-105"
        fill
        loading="eager"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-base)]/60 via-transparent to-transparent" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 h-16 w-16">
        <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[var(--color-racing-cyan)] to-transparent" />
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-[var(--color-racing-cyan)] to-transparent" />
      </div>
      <div className="absolute right-0 bottom-0 h-16 w-16">
        <div className="absolute right-0 bottom-0 h-full w-[2px] bg-gradient-to-t from-[var(--color-racing-magenta)] to-transparent" />
        <div className="absolute right-0 bottom-0 h-[2px] w-full bg-gradient-to-l from-[var(--color-racing-magenta)] to-transparent" />
      </div>
    </div>
  );
});
