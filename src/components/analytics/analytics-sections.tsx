import type {
  AnalyticsAiSignal,
  MarketIntelligenceItem,
  WalletActivityMetric,
} from "@/lib/analytics-data";
import { cn } from "@/lib/utils";

const SIGNAL_STYLES = {
  info: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  bullish: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  caution: "border-amber-500/30 bg-amber-500/10 text-amber-300",
} as const;

type WalletActivityCardsProps = {
  metrics: WalletActivityMetric[];
};

export function WalletActivityCards({ metrics }: WalletActivityCardsProps) {
  return (
    <section className="min-w-0 space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
          Wallet
        </p>
        <h2 className="mt-1 text-xl font-semibold">Wallet activity</h2>
      </div>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        {metrics.map((metric) => (
          <article
            key={metric.id}
            className="rounded-[24px] border border-orbit-border bg-orbit-surface p-4 sm:p-5"
          >
            <p className="text-sm text-orbit-muted">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-orbit-foreground">
              {metric.value}
            </p>
            <p
              className={cn(
                "mt-1 text-xs",
                metric.positive ? "text-green-400" : "text-amber-300",
              )}
            >
              {metric.changeLabel}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

type AiSignalCardsProps = {
  signals: AnalyticsAiSignal[];
};

export function AiSignalCards({ signals }: AiSignalCardsProps) {
  return (
    <section className="min-w-0 space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
          Aomi AI
        </p>
        <h2 className="mt-1 text-xl font-semibold">AI signals</h2>
      </div>
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        {signals.map((signal) => (
          <article
            key={signal.id}
            className="rounded-[24px] border border-orbit-border bg-orbit-surface-strong p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-xs capitalize",
                  SIGNAL_STYLES[signal.severity],
                )}
              >
                {signal.severity}
              </span>
              <h3 className="text-sm font-semibold text-orbit-foreground">
                {signal.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-orbit-muted">
              {signal.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

type MarketIntelligenceSectionProps = {
  items: MarketIntelligenceItem[];
};

export function MarketIntelligenceSection({
  items,
}: MarketIntelligenceSectionProps) {
  return (
    <section className="min-w-0 space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
          Intelligence
        </p>
        <h2 className="mt-1 text-xl font-semibold">Market intelligence</h2>
        <p className="mt-2 max-w-2xl text-sm text-orbit-muted">
          Agent-detected patterns across Zora, liquidity venues, and bridge flows
          on Base.
        </p>
      </div>
      <div className="grid min-w-0 gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="relative overflow-hidden rounded-[24px] border border-purple-500/20 bg-orbit-surface p-4 sm:p-5"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl"
            />
            <h3 className="relative text-base font-semibold leading-snug text-orbit-foreground">
              {item.headline}
            </h3>
            <p className="relative mt-3 text-sm leading-relaxed text-orbit-muted">
              {item.summary}
            </p>
            <div className="relative mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-orbit-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
