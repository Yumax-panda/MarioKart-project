import Image from "next/image";
import { memo } from "react";

type Props = {
  title: string;
  src: string;
};

export const Thumbnail = memo(({ src, title }: Props) => {
  return (
    <div className="not-prose relative h-80 w-full overflow-hidden rounded-2xl">
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
