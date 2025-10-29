import type { ReactNode } from "react";
import { cn } from "@/lib/css";

type Props = {
  children: ReactNode;
  className?: string;
};

export const MarkdownWrapper = ({ children, className }: Props) => (
  <div
    className={cn(
      "rounded-md border-1 border-[#1b324a] bg-[#0d223a] p-3",
      className,
    )}
  >
    {children}
  </div>
);
