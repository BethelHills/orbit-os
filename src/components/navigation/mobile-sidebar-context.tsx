"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { NavigationMenuSheet } from "@/components/navigation/navigation-menu-sheet";

type MobileSidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openSidebar: () => void;
};

const MobileSidebarContext = createContext<MobileSidebarContextValue | null>(
  null
);

export function MobileSidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      openSidebar: () => setOpen(true),
    }),
    [open]
  );

  return (
    <MobileSidebarContext.Provider value={value}>
      {children}
      <NavigationMenuSheet open={open} onOpenChange={setOpen} />
    </MobileSidebarContext.Provider>
  );
}

export function useMobileSidebar() {
  return useContext(MobileSidebarContext);
}
