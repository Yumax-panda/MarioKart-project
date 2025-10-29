import Image from "next/image";

type Props = {
  title: string;
  src: string;
};

export const Thumbnail = ({ src, title }: Props) => (
  <div className="not-prose relative h-80 w-full overflow-hidden rounded-2xl">
    <Image
      src={src}
      alt={`Thumbnail: ${title}`}
      className="object-cover"
      fill
    />
  </div>
);
