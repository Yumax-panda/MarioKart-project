import Image from "next/image";

const AVATAR_SIZE = 64;
const DEFAULT_AUTHOR_NAME = "Anonymous";

type Props = {
  name: string | null;
  image: string | null;
  bio?: string | null;
};

type AuthorAvatarProps = {
  image: string | null;
  name: string | null;
};

type AuthorDetailsProps = {
  name: string | null;
  bio?: string | null;
};

const AuthorAvatar = ({ image, name }: AuthorAvatarProps) => {
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

const AuthorDetails = ({ name, bio }: AuthorDetailsProps) => {
  const displayName = name || DEFAULT_AUTHOR_NAME;

  return (
    <div className="flex-1">
      <div className="mb-1 font-[family-name:var(--font-body)] text-gray-500 text-xs uppercase tracking-wider">
        Written by
      </div>
      <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg text-white">
        {displayName}
      </h3>
      {bio && (
        <p className="mt-2 font-[family-name:var(--font-body)] text-gray-400 text-sm">
          {bio}
        </p>
      )}
    </div>
  );
};

export const AuthorInfo = ({ name, image, bio }: Props) => {
  return (
    <div className="relative mt-16 overflow-hidden rounded-xl border border-[var(--color-racing-cyan)]/20 bg-[var(--color-dark-elevated)]/50 p-6 backdrop-blur-sm">
      {/* Decorative corner accent */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[var(--color-racing-cyan)] via-[var(--color-racing-magenta)] to-transparent opacity-50" />

      <div className="flex items-start gap-4">
        <AuthorAvatar image={image} name={name} />
        <AuthorDetails name={name} bio={bio} />
      </div>
    </div>
  );
};
