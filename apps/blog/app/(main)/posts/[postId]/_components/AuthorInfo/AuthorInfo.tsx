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
      {image ? (
        <Image
          src={image}
          alt={displayName}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          className="h-full w-full rounded-full"
        />
      ) : (
        <div className="h-full w-full rounded-full bg-gray-700" />
      )}
    </div>
  );
};

const AuthorDetails = ({ name, bio }: AuthorDetailsProps) => {
  const displayName = name || DEFAULT_AUTHOR_NAME;

  return (
    <div className="flex-1">
      <h3 className="font-semibold text-gray-200 text-lg">{displayName}</h3>
      {bio && <p className="mt-1 text-gray-300 text-sm">{bio}</p>}
    </div>
  );
};

export const AuthorInfo = ({ name, image, bio }: Props) => {
  return (
    <div className="mt-12 border-gray-700 border-t pt-8">
      <div className="flex items-start gap-4">
        <AuthorAvatar image={image} name={name} />
        <AuthorDetails name={name} bio={bio} />
      </div>
    </div>
  );
};
