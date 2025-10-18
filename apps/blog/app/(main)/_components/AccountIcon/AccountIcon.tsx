import Image from "next/image";

type Props = {
  name: string;
  image: string;
  onClick: () => void;
};

export const AccountIcon = ({ name, image, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-full p-2 transition-colors hover:bg-gray-100"
    >
      <Image
        src={image}
        alt={name}
        width={32}
        height={32}
        className="rounded-full border-2 border-gray-300"
      />
    </button>
  );
};
