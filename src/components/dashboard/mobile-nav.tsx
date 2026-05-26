"use client";

import { useState } from "react";
import { Bell, Menu, Orbit } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarContent } from "@/components/sidebar/sidebar-content";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-strong sticky top-0 z-40 flex shrink-0 items-center justify-between border-b border-purple-500/10 px-4 py-3 lg:hidden">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 shadow-[0_0_16px_rgba(168,85,247,0.45)]">
          <Orbit className="size-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="neon-text truncate text-base font-bold tracking-tight">OrbitOS</p>
          <p className="truncate text-[10px] text-purple-300/80">Base · Online</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
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
            className="flex w-[min(100vw,17.5rem)] flex-col border-r border-purple-500/10 bg-[#0a0a14]/95 p-0 text-white backdrop-blur-xl"
          >
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
