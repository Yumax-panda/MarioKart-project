import Image from "next/image";
import { memo } from "react";

type Props = {
  title: string;
  src: string;
};

export const Thumbnail = memo(({ src, title }: Props) => {
  return (
    <div className="not-prose group relative h-80 w-full overflow-hidden rounded-xl border border-[var(--color-racing-cyan)]/20 shadow-2xl shadow-[var(--color-racing-cyan)]/10">
      <Image
        src={src}
        alt={`Thumbnail: ${title}`}
        className="object-cover"
        fill
        loading="eager"
      />
    </div>
  );
});
