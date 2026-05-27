"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu, MessageCircle } from "lucide-react";
import { OrbitBrand } from "@/components/brand/orbit-brand";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarContent } from "@/components/sidebar/sidebar-content";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";

interface MobileNavProps {
  onOpenAssistant?: () => void;
}

export function MobileNav({ onOpenAssistant }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="glass-strong sticky top-0 z-40 flex shrink-0 items-center justify-between border-b border-purple-500/10 px-4 py-3 md:hidden">
      <div className="flex min-w-0 items-center gap-2.5">
        <OrbitBrand compact showTagline={false} />
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <ConnectWalletButton compact />

        {onOpenAssistant && (
          <button
            type="button"
            onClick={onOpenAssistant}
            className="rounded-lg border border-purple-500/20 bg-purple-500/10 p-2 text-purple-200 transition hover:bg-purple-500/20"
            aria-label="Open Aomi assistant"
          >
            <MessageCircle size={18} />
          </button>
        )}

        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-300 transition hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-purple-600 text-[8px] font-bold text-white">
            3
          </span>
        </button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            showCloseButton={false}
            onOpenAutoFocus={(event) => event.preventDefault()}
            className="flex w-[min(100vw,17.5rem)] flex-col border-r border-purple-500/10 bg-[#0a0a14]/95 p-0 text-white backdrop-blur-xl"
          >
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
