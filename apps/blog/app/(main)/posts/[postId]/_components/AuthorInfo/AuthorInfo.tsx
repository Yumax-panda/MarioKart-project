import { AuthorAvatar } from "./AuthorAvatar";
import { AuthorDetails } from "./AuthorDetails";

type Props = {
  name: string | null;
  image: string | null;
  bio?: string | null;
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
