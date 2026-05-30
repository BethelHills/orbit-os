import type { PortfolioSnapshot } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const RISK_STYLES = {
  Low: "border-emerald-500/35 bg-emerald-500/10 text-emerald-300",
  Medium: "border-amber-500/35 bg-amber-500/10 text-amber-300",
  High: "border-orange-500/35 bg-orange-500/10 text-orange-300",
} as const;

type PortfolioSidePanelsProps = {
  snapshot: PortfolioSnapshot;
};

export function PortfolioSidePanels({ snapshot }: PortfolioSidePanelsProps) {
  return (
    <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
      <article className="rounded-[28px] border border-orbit-border bg-orbit-surface p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-orbit-accent">
              Risk summary
            </p>
            <h2 className="mt-2 text-lg font-semibold">Portfolio risk</h2>
          </div>
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-medium",
              RISK_STYLES[snapshot.riskLevel],
            )}
          >
            {snapshot.riskLevel}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-orbit-muted">
            <span>Risk score</span>
            <span>{snapshot.riskScore}/100</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                snapshot.riskLevel === "Low" && "bg-emerald-400",
                snapshot.riskLevel === "Medium" && "bg-amber-400",
                snapshot.riskLevel === "High" && "bg-orange-400",
              )}
              style={{ width: `${snapshot.riskScore}%` }}
            />
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {snapshot.riskNotes.map((note) => (
            <li
              key={note}
              className="text-sm leading-relaxed text-orbit-muted before:mr-2 before:text-purple-400 before:content-['•']"
            >
              {note}
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-[28px] border border-purple-500/25 bg-orbit-surface p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-orbit-accent">
          Aomi AI
        </p>
        <h2 className="mt-2 text-lg font-semibold">Portfolio recommendations</h2>
        <ul className="mt-4 space-y-3">
          {snapshot.recommendations.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-orbit-subtle bg-orbit-surface-strong px-4 py-3 text-sm leading-relaxed text-orbit-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
