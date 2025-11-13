import { EditIcon } from "app/_components/Icon/EditIcon";
import Link from "next/link";
import { urls } from "@/lib/urls";

type Props = {
  postId: string;
};

export const EditButton = ({ postId }: Props) => (
  <Link
    href={urls.postsDetailEdit(postId)}
    className="group fixed bottom-8 left-8 flex size-14 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-teal-600 hover:shadow-xl"
    aria-label="記事を編集"
  >
    <EditIcon />
  </Link>
);
