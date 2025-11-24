import type { DOMAttributes, ReactNode } from "react";
import { cn } from "@/lib/css";

type Props = Pick<
  DOMAttributes<HTMLElement>,
  "onDrop" | "onDragOver" | "onDragEnter" | "onDragLeave"
> & {
  isDraggingOver: boolean;
  children: ReactNode;
};

export const ImageDropzone = ({ children, isDraggingOver, ...rest }: Props) => (
  <section
    {...rest}
    aria-label="画像をドロップしてアップロード"
    className={cn(
      "rounded-lg transition-all",
      isDraggingOver &&
        "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900",
    )}
  >
    {children}
  </section>
);
