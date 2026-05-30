"use client";

import Link from "next/link";
import { ArrowUpRight, Copy, Wallet } from "lucide-react";

import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import type { PortfolioSnapshot } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type PortfolioCtaBarProps = {
  className?: string;
};

export function PortfolioCtaBar({ className }: PortfolioCtaBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap",
        className,
      )}
    >
      <Link
        href={buildAgentChatUrl("Show my wallet balance")}
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500 sm:flex-none sm:px-5"
      >
        Check balance in Agent Chat
        <ArrowUpRight className="size-4 opacity-80" />
      </Link>
      <Link
        href="/trade-actions"
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-orbit-border bg-orbit-surface px-4 py-2.5 text-sm font-medium text-orbit-foreground transition hover:border-purple-500/40 hover:bg-orbit-surface-strong sm:flex-none sm:px-5"
      >
        Browse Trade / Actions
        <ArrowUpRight className="size-4 opacity-80" />
      </Link>
    </div>
  );
}

type WalletSummaryCardProps = {
  snapshot: PortfolioSnapshot;
  loading?: boolean;
};

export function WalletSummaryCard({
  snapshot,
  loading,
}: WalletSummaryCardProps) {
  async function copyAddress() {
    if (!snapshot.address) return;
    try {
      await navigator.clipboard.writeText(snapshot.address);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <article className="relative overflow-hidden rounded-[28px] border border-orbit-border bg-orbit-surface p-5 sm:p-6 lg:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-600/15 blur-3xl"
      />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-xs text-purple-200">
              <Wallet className="size-3.5" />
              Wallet summary
            </span>
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs",
                snapshot.source === "live"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-300",
              )}
            >
              {snapshot.source === "live" ? "Live data" : "Mock preview"}
            </span>
          </div>

          <div>
            <p className="text-sm text-orbit-muted">Total portfolio value</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-orbit-foreground sm:text-4xl">
              {loading ? "—" : snapshot.totalValueLabel}
            </p>
          </div>

          <p className="text-sm text-orbit-muted">
            {snapshot.isConnected
              ? snapshot.onBase
                ? "Synced from your connected wallet on Base."
                : "Wallet connected on a non-Base network — switch to Base for accurate balances."
              : "Connect a wallet to sync live balances, or review the mock portfolio below."}
          </p>
        </div>

        <div className="min-w-0 rounded-2xl border border-orbit-subtle bg-orbit-surface-strong p-4 lg:max-w-md lg:flex-1">
          <p className="text-xs uppercase tracking-[0.18em] text-orbit-accent">
            Base wallet address
          </p>
          {snapshot.address ? (
            <div className="mt-2 flex min-w-0 items-start gap-2">
              <code className="min-w-0 flex-1 break-all text-sm text-orbit-foreground sm:text-base">
                {snapshot.address}
              </code>
              <button
                type="button"
                onClick={() => void copyAddress()}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-orbit-subtle text-orbit-muted transition hover:border-purple-500/40 hover:text-orbit-foreground"
                aria-label="Copy wallet address"
              >
                <Copy className="size-4" />
              </button>
            </div>
          ) : (
            <p className="mt-2 text-sm text-orbit-muted">
              Not connected — mock portfolio shown
            </p>
          )}
          <p className="mt-3 text-xs text-orbit-muted">
            Network: {snapshot.network}
            {snapshot.addressShort ? ` · ${snapshot.addressShort}` : null}
          </p>
        </div>
      </div>
    </article>
  );
}

type BalanceCardsProps = {
  snapshot: PortfolioSnapshot;
  loading?: boolean;
};

export function BalanceCards({ snapshot, loading }: BalanceCardsProps) {
  const cards = [
    {
      label: "ETH balance",
      value: loading ? "—" : snapshot.ethBalanceLabel,
      sub: loading ? "—" : `${snapshot.ethValueUsd.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} est.`,
      accent: "from-purple-500/20 to-transparent",
    },
    {
      label: "USDC balance",
      value: loading ? "—" : snapshot.usdcBalanceLabel,
      sub: loading ? "—" : `${snapshot.usdcValueUsd.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}`,
      accent: "from-cyan-500/15 to-transparent",
    },
  ];

  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <article
          key={card.label}
          className="relative overflow-hidden rounded-[24px] border border-orbit-border bg-orbit-surface p-5"
        >
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80",
              card.accent,
            )}
          />
          <div className="relative">
            <p className="text-sm text-orbit-muted">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-orbit-foreground">
              {card.value}
            </p>
            <p className="mt-1 text-xs text-orbit-muted">{card.sub}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
