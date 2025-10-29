import type { ReactNode } from "react";
import { cn } from "@/lib/css";

type Props = {
  children: ReactNode;
  className?: string;
};

export const ContentWrapper = ({ children, className }: Props) => (
  <div className={cn("prose dark:prose-invert", className)}>{children}</div>
);
