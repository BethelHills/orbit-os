"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarContent } from "@/components/sidebar/sidebar-content";

interface NavigationMenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NavigationMenuSheet({
  open,
  onOpenChange,
}: NavigationMenuSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        showCloseButton={false}
        onOpenAutoFocus={(event) => event.preventDefault()}
        className="flex w-[min(100vw,17.5rem)] flex-col border-r border-purple-500/10 bg-[#0a0a14]/95 p-0 text-white backdrop-blur-xl md:hidden"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
