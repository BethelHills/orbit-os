"use client";

import { ActionCard } from "@/components/trade/action-card";
import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";
import { TRADE_ACTION_CARDS } from "@/lib/trade-actions-data";

export function TradeActionsWorkspace() {
  return (
    <StandalonePageShell>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-purple-600/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-32 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <StandalonePageHeader
          title="Trade / Actions"
          subtitle="One-click Aomi action cards for Zora, wallet checks, and Base protocol workflows. Each action opens Agent Chat with a ready-to-run prompt."
        />

        <div className="relative mb-8 flex flex-wrap gap-2 sm:mb-10">
          {(["Low", "Medium", "High"] as const).map((risk) => {
            const count = TRADE_ACTION_CARDS.filter((a) => a.risk === risk).length;
            return (
              <span
                key={risk}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-orbit-muted"
              >
                {count} {risk.toLowerCase()} risk
              </span>
            );
          })}
        </div>

        <div className="relative grid min-w-0 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
          {TRADE_ACTION_CARDS.map((action) => (
            <ActionCard key={action.id} action={action} />
          ))}
        </div>
      </div>
    </StandalonePageShell>
  );
}
