"use client";

import { Menu, MessageCircle } from "lucide-react";
import { OrbitBrand } from "@/components/brand/orbit-brand";
import { useMobileSidebar } from "@/components/navigation/mobile-sidebar-context";
import { NotificationsBell } from "@/components/navigation/notifications-bell";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";

interface MobileNavBarProps {
  onOpenAssistant?: () => void;
}

export function MobileNavBar({ onOpenAssistant }: MobileNavBarProps) {
  const sidebar = useMobileSidebar();

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
            className="min-h-10 min-w-10 touch-manipulation rounded-lg border border-purple-500/20 bg-purple-500/10 p-2 text-purple-200 transition hover:bg-purple-500/20"
            aria-label="Open Aomi assistant"
          >
            <MessageCircle size={18} />
          </button>
        )}

        <NotificationsBell compact />

        <button
          type="button"
          onClick={() => sidebar?.openSidebar()}
          className="min-h-10 min-w-10 touch-manipulation rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
