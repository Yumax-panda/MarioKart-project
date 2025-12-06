import { useEffect, useRef, useState } from "react";
import { client } from "@/lib/rpc-browser";

export const useAccountIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    window.location.href = client.api.v1.sessions.logout.$url().toString();
  };

  return { isOpen, setIsOpen, menuRef, handleLogout };
};
