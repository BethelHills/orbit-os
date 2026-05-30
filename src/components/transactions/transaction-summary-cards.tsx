import type { TransactionsSummary } from "@/lib/transactions-data";
import { cn } from "@/lib/utils";

type TransactionSummaryCardsProps = {
  summary: TransactionsSummary;
};

const CARD_CONFIG = [
  {
    key: "staged" as const,
    label: "Staged",
    accent: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    glow: "from-amber-500/10",
  },
  {
    key: "simulated" as const,
    label: "Simulated",
    accent: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
    glow: "from-cyan-500/10",
  },
  {
    key: "signed" as const,
    label: "Signed",
    accent: "border-purple-500/30 bg-purple-500/10 text-purple-200",
    glow: "from-purple-500/10",
  },
  {
    key: "confirmed" as const,
    label: "Confirmed",
    accent: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    glow: "from-emerald-500/10",
  },
  {
    key: "failed" as const,
    label: "Failed",
    accent: "border-red-500/30 bg-red-500/10 text-red-300",
    glow: "from-red-500/10",
  },
] as const;

export function TransactionSummaryCards({ summary }: TransactionSummaryCardsProps) {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {CARD_CONFIG.map((card) => (
        <article
          key={card.key}
          className="relative overflow-hidden rounded-[24px] border border-orbit-border bg-orbit-surface p-4 sm:p-5"
        >
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br to-transparent blur-2xl",
              card.glow,
            )}
          />
          <p className="text-xs uppercase tracking-[0.14em] text-orbit-muted">
            {card.label}
          </p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-orbit-foreground sm:text-3xl">
            {summary[card.key]}
          </p>
          <span
            className={cn(
              "mt-3 inline-flex rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]",
              card.accent,
            )}
          >
            {card.label}
          </span>
        </article>
      ))}

      <article className="relative overflow-hidden rounded-[24px] border border-orbit-border bg-orbit-surface-strong p-4 sm:col-span-2 sm:p-5 xl:col-span-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 top-0 h-24 w-24 rounded-full bg-purple-600/15 blur-3xl"
        />
        <p className="text-xs uppercase tracking-[0.14em] text-orbit-accent">
          Gas spent (confirmed)
        </p>
        <p className="mt-2 font-mono text-xl font-semibold text-orbit-foreground sm:text-2xl">
          {summary.totalGasSpentLabel}
        </p>
        <p className="mt-2 text-sm text-orbit-muted">
          Aggregate gas for confirmed on-chain actions in this timeline window.
        </p>
      </article>
    </div>
  );
}
