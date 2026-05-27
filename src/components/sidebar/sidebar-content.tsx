"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { OrbitBrand } from "@/components/brand/orbit-brand";
import {
  LayoutDashboard,
  MessageCircle,
  ArrowLeftRight,
  Wallet,
  BarChart3,
  Layers,
  Bell,
  Receipt,
  Plug,
  Settings,
  Gem,
  type LucideIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWalletDisplayName, useWalletInitials } from "@/hooks/use-wallet-display";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useAccount } from "wagmi";

type NavItem = {
  name: string;
  icon: LucideIcon;
  href?: string;
};

const links: NavItem[] = [
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "Agent Chat", icon: MessageCircle, href: "/chat" },
  { name: "Trade / Actions", icon: ArrowLeftRight, href: "/actions" },
  { name: "Portfolio", icon: Wallet },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Protocols", icon: Layers, href: "/protocols" },
  { name: "Alerts", icon: Bell },
  { name: "Transactions", icon: Receipt },
  { name: "Integrations", icon: Plug },
  { name: "Settings", icon: Settings },
];

const EARLY_FORGE_END = new Date("2026-06-01T00:00:00Z");

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function useCountdown(target: Date) {
  const mounted = useMounted();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!mounted) return;

    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [mounted, target]);

  return time;
}

interface SidebarContentProps {
  collapsed?: boolean;
}

export function SidebarContent({ collapsed = false }: SidebarContentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();
  const countdown = useCountdown(EARLY_FORGE_END);
  const { isConnected } = useAccount();
  const walletAddress = useWalletDisplayName();
  const walletInitials = useWalletInitials();
  const connected = mounted && isConnected;

  const navItems = links.map((item) => {
    const Icon = item.icon;
    const href = item.href;
    const active = href ? isNavActive(pathname, href) : false;
    const itemClassName = cn(
      "flex w-full items-center rounded-xl transition",
      collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2 text-[13px]",
      active
        ? "bg-gradient-to-r from-purple-600/40 to-blue-600/20 font-medium text-white shadow-[0_0_24px_rgba(139,92,246,0.25)]"
        : "text-slate-400 hover:bg-white/5 hover:text-white",
      !href && "cursor-default opacity-60"
    );

    const content = (
      <>
        <Icon size={collapsed ? 18 : 16} className={active ? "text-purple-300" : ""} />
        {!collapsed && item.name}
      </>
    );

    const navNode = href ? (
      <Link
        key={item.name}
        href={href}
        onClick={(event) => {
          event.preventDefault();
          router.push(href);
        }}
        className={itemClassName}
      >
        {content}
      </Link>
    ) : (
      <button key={item.name} type="button" disabled className={itemClassName}>
        {content}
      </button>
    );

    if (!collapsed) return navNode;

    return (
      <Tooltip key={item.name}>
        <TooltipTrigger asChild>{navNode}</TooltipTrigger>
        <TooltipContent side="right">{item.name}</TooltipContent>
      </Tooltip>
    );
  });

  const content = (
    <div className="flex h-full min-h-0 flex-col">
      <div
        className={cn(
          "border-b border-white/5",
          collapsed ? "flex justify-center px-2 py-4" : "px-5 py-5"
        )}
      >
        {collapsed ? (
          <Image
            src="/images/OrbitOS.logo.png"
            alt="OrbitOS"
            width={40}
            height={40}
            priority
            className="h-9 w-9 object-contain"
          />
        ) : (
          <OrbitBrand />
        )}
      </div>

      <nav
        className={cn(
          "flex-1 space-y-0.5 overflow-y-auto py-4",
          collapsed ? "px-2" : "px-3"
        )}
      >
        {navItems}
      </nav>

      {!collapsed && (
        <div className="mx-3 mb-3 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-blue-900/20 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20">
              <Gem className="size-5 text-purple-300" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-purple-300/80">
                Early Forge
              </p>
              <p className="mt-0.5 text-xs font-semibold text-white">Bounty Season</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1 text-center">
            {[
              { label: "Days", val: countdown.d },
              { label: "Hrs", val: countdown.h },
              { label: "Mins", val: countdown.m },
              { label: "Secs", val: countdown.s },
            ].map((u) => (
              <div key={u.label} className="rounded-lg bg-black/30 px-1 py-1.5">
                <p suppressHydrationWarning className="text-sm font-bold text-white">
                  {String(u.val).padStart(2, "0")}
                </p>
                <p className="text-[9px] text-slate-500">{u.label}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-purple-600/80 to-blue-600/80 py-2 text-[11px] font-medium text-white transition hover:brightness-110"
          >
            View Bounty Guide
          </button>
        </div>
      )}

      {collapsed && (
        <div className="px-2 pb-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 p-2.5 text-purple-300 transition hover:bg-purple-500/20"
              >
                <Gem className="size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Early Forge · Bounty Season</TooltipContent>
          </Tooltip>
        </div>
      )}

      <div
        className={cn(
          "border-t border-white/5",
          collapsed ? "flex justify-center px-2 py-4" : "px-4 py-4"
        )}
      >
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-9 w-9 cursor-default items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-xs font-bold">
                {walletInitials}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              {walletAddress} · {connected ? "Connected" : "Not connected"}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-xs font-bold">
              {walletInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{walletAddress}</p>
              <p className="flex items-center gap-1.5 text-[11px] text-green-400">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full shadow-[0_0_6px_rgba(74,222,128,0.8)]",
                    connected ? "bg-green-400" : "bg-slate-500"
                  )}
                />
                {connected ? "Connected" : "Not connected"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (collapsed) {
    return <TooltipProvider delayDuration={0}>{content}</TooltipProvider>;
  }

  return content;
}
