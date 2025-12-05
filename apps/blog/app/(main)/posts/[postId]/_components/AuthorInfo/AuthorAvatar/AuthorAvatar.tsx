import Image from "next/image";

const AVATAR_SIZE = 64;
const DEFAULT_AUTHOR_NAME = "Anonymous";

type AuthorAvatarProps = {
  image: string | null;
  name: string | null;
};

export const AuthorAvatar = ({ image, name }: AuthorAvatarProps) => {
  const displayName = name || DEFAULT_AUTHOR_NAME;

  return (
    <div className="relative aspect-square w-16 shrink-0">
      <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-[var(--color-racing-cyan)] to-[var(--color-racing-magenta)] opacity-50 blur-md" />
      {image ? (
        <Image
          src={image}
          alt={displayName}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          className="relative z-10 h-full w-full rounded-full border-2 border-[var(--color-racing-cyan)]/30"
        />
      ) : (
        <div className="relative z-10 h-full w-full rounded-full border-2 border-[var(--color-racing-cyan)]/30 bg-[var(--color-dark-elevated)]" />
      )}
    </div>
  );
};
