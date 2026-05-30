"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import type { TradeActionCard, TradeActionRisk } from "@/lib/trade-actions-data";
import { cn } from "@/lib/utils";

const RISK_STYLES: Record<
  TradeActionRisk,
  { badge: string; glow: string; dot: string }
> = {
  Low: {
    badge: "border-emerald-500/35 bg-emerald-500/10 text-emerald-300",
    glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.12)]",
    dot: "bg-emerald-400",
  },
  Medium: {
    badge: "border-amber-500/35 bg-amber-500/10 text-amber-300",
    glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.12)]",
    dot: "bg-amber-400",
  },
  High: {
    badge: "border-orange-500/35 bg-orange-500/10 text-orange-300",
    glow: "group-hover:shadow-[0_0_40px_rgba(249,115,22,0.14)]",
    dot: "bg-orange-400",
  },
};

type ActionCardProps = {
  action: TradeActionCard;
};

export function ActionCard({ action }: ActionCardProps) {
  const riskStyle = RISK_STYLES[action.risk];
  const href = buildAgentChatUrl(action.prompt);

  return (
    <article
      className={cn(
        "group relative flex min-h-full min-w-0 flex-col overflow-hidden rounded-[28px] border border-orbit-border bg-orbit-surface p-5 transition duration-300 sm:p-6",
        "hover:border-purple-500/45 hover:bg-orbit-surface-strong",
        riskStyle.glow,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20"
      />

      <div className="relative flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-orbit-accent">
            {action.protocol}
          </p>
          <h2 className="break-words text-lg font-semibold leading-snug text-orbit-foreground sm:text-xl">
            {action.title}
          </h2>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
            riskStyle.badge,
          )}
        >
          <span className={cn("size-1.5 rounded-full", riskStyle.dot)} />
          {action.risk} risk
        </span>
      </div>

      <p className="relative mt-4 flex-1 break-words text-sm leading-relaxed text-orbit-muted">
        {action.description}
      </p>

      <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-orbit-muted/80">
          Opens Agent Chat with a suggested prompt
        </p>
        <Link
          href={href}
          className={cn(
            "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium sm:w-auto",
            "bg-purple-600 text-white transition hover:bg-purple-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510]",
          )}
        >
          {action.ctaLabel ?? "Run action"}
          <ArrowUpRight className="size-4 shrink-0 opacity-80" />
        </Link>
      </div>
    </article>
  );
}
