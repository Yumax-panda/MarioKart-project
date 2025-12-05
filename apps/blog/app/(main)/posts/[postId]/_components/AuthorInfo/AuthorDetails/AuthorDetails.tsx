const DEFAULT_AUTHOR_NAME = "Anonymous";

type AuthorDetailsProps = {
  name: string | null;
  bio?: string | null;
};

export const AuthorDetails = ({ name, bio }: AuthorDetailsProps) => {
  const displayName = name || DEFAULT_AUTHOR_NAME;

  return (
    <div className="flex-1">
      <div className="mb-1 text-gray-500 text-xs uppercase tracking-wider">
        Written by
      </div>
      <h3 className="font-semibold text-lg text-white">{displayName}</h3>
      {bio && <p className="mt-2 text-gray-400 text-sm">{bio}</p>}
    </div>
  );
};
