"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Bot,
  CircleAlert,
  Receipt,
  Shield,
  type LucideIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";
import {
  notifications as initialNotifications,
  type OrbitNotification,
} from "@/lib/orbitos-data";
import { cn } from "@/lib/utils";

const kindIcons: Record<OrbitNotification["kind"], LucideIcon> = {
  alert: CircleAlert,
  tx: Receipt,
  agent: Bot,
  system: Shield,
};

interface NotificationsBellProps {
  compact?: boolean;
  className?: string;
}

export function NotificationsBell({ compact = false, className }: NotificationsBellProps) {
  const router = useRouter();
  const mounted = useMounted();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialNotifications);

  const unreadCount = useMemo(
    () => items.filter((item) => !item.read).length,
    [items]
  );

  const sheetSide = !mounted || isMobile ? "bottom" : "right";

  function markAllRead() {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  }

  function openNotification(item: OrbitNotification) {
    setItems((current) =>
      current.map((entry) =>
        entry.id === item.id ? { ...entry, read: true } : entry
      )
    );
    setOpen(false);
    if (item.href) router.push(item.href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          compact
            ? "relative min-h-10 min-w-10 touch-manipulation rounded-lg p-2 text-slate-300 transition hover:text-white active:scale-[0.98]"
            : "glass relative inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-xl p-2.5 text-slate-300 transition hover:text-white active:scale-[0.98]",
          className
        )}
        aria-label={
          unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : "Notifications"
        }
      >
        <Bell size={compact ? 18 : 16} />
        {unreadCount > 0 && (
          <span
            className={cn(
              "absolute flex items-center justify-center rounded-full bg-purple-600 font-bold text-white",
              compact
                ? "right-0.5 top-0.5 h-4 min-w-4 px-0.5 text-[9px]"
                : "-right-0.5 -top-0.5 h-4 min-w-4 px-0.5 text-[9px] sm:h-[18px] sm:min-w-[18px] sm:text-[10px]"
            )}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={sheetSide}
          className={cn(
            "flex flex-col gap-0 border-purple-500/10 bg-[#0a0a14]/95 p-0 text-white backdrop-blur-xl",
            sheetSide === "bottom"
              ? "max-h-[min(85dvh,640px)] rounded-t-[28px]"
              : "w-[min(100vw,24rem)] sm:max-w-md"
          )}
        >
          <SheetHeader className="shrink-0 border-b border-white/10 px-4 pb-4 pt-5 sm:px-5">
            <div className="flex items-start justify-between gap-3 pr-8">
              <div className="min-w-0">
                <SheetTitle className="text-left text-lg font-semibold text-white">
                  Notifications
                </SheetTitle>
                <SheetDescription className="text-left text-sm text-slate-400">
                  {unreadCount > 0
                    ? `${unreadCount} unread alert${unreadCount === 1 ? "" : "s"}`
                    : "You are all caught up"}
                </SheetDescription>
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="shrink-0 touch-manipulation text-xs font-medium text-purple-300 transition hover:text-purple-200"
                >
                  Mark all read
                </button>
              )}
            </div>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5">
            <ul className="space-y-2">
              {items.map((item) => {
                const Icon = kindIcons[item.kind];
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => openNotification(item)}
                      className={cn(
                        "flex w-full touch-manipulation items-start gap-3 rounded-2xl border p-3 text-left transition active:scale-[0.99] sm:p-4",
                        item.read
                          ? "border-white/5 bg-white/[0.02] hover:border-white/10"
                          : "border-purple-500/25 bg-purple-500/10 hover:border-purple-500/40"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10",
                          item.read
                            ? "bg-white/5 text-slate-400"
                            : "bg-purple-500/20 text-purple-200"
                        )}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="break-words text-sm font-medium leading-snug text-white">
                            {item.title}
                          </p>
                          {!item.read && (
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-400" />
                          )}
                        </div>
                        <p className="mt-1 break-words text-xs leading-relaxed text-slate-400 sm:text-sm">
                          {item.message}
                        </p>
                        <p className="mt-2 text-[11px] text-slate-500 sm:text-xs">
                          {item.time}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="shrink-0 border-t border-white/10 p-4 sm:p-5">
            <Link
              href="/alerts"
              onClick={() => setOpen(false)}
              className="flex min-h-11 touch-manipulation items-center justify-center rounded-xl border border-purple-500/25 bg-purple-500/10 text-sm font-medium text-purple-200 transition hover:border-purple-500/40 hover:bg-purple-500/15"
            >
              Open AI Watchtower
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
