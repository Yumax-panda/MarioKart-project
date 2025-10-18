"use client";

import type { ReactNode } from "react";
import { AccountProvider } from "./AccountContext";

export const Provider = ({ children }: { children: ReactNode }) => (
  <AccountProvider>{children}</AccountProvider>
);
