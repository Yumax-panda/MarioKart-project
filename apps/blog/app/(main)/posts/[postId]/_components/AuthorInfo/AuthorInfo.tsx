import Image from "next/image";
import { cn } from "@/lib/css";

type Props = {
  name: string | null;
  image: string | null;
  bio?: string | null;
};

export const AuthorInfo = ({ name, image, bio }: Props) => {
  return (
    <div className="mt-12 border-gray-700 border-t pt-8">
      <div className={cn("flex gap-4", bio ? "items-start" : "items-center")}>
        <div
          className={cn(
            "relative aspect-square w-16 shrink-0",
            bio && "mt-0.5",
          )}
        >
          {image ? (
            <Image
              src={image}
              alt={name || "Author"}
              width={64}
              height={64}
              className="h-full w-full rounded-full"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-gray-700" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex-1 leading-normal">
              <h3 className="font-semibold text-gray-200 text-lg">
                {name || "Anonymous"}
              </h3>
              {bio && <p className="mt-1 text-gray-300 text-sm">{bio}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
