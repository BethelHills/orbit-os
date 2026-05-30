import Link from "next/link";
import { ArrowUpRight, BellOff } from "lucide-react";

import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import {
  ALERT_TYPE_LABELS,
  type AlertSeverity,
  type AlertStatus,
  type WatchtowerAlert,
} from "@/lib/alerts-data";
import { cn } from "@/lib/utils";

const SEVERITY_STYLES: Record<AlertSeverity, string> = {
  low: "border-emerald-500/35 bg-emerald-500/10 text-emerald-300",
  medium: "border-amber-500/35 bg-amber-500/10 text-amber-300",
  high: "border-orange-500/35 bg-orange-500/10 text-orange-300",
};

const STATUS_STYLES: Record<AlertStatus, string> = {
  active: "border-sky-500/35 bg-sky-500/10 text-sky-300",
  paused: "border-white/15 bg-white/[0.04] text-orbit-muted",
  triggered: "border-purple-500/35 bg-purple-500/10 text-purple-200",
};

type AlertCardProps = {
  alert: WatchtowerAlert;
};

export function AlertCard({ alert }: AlertCardProps) {
  return (
    <article
      className={cn(
        "group relative flex min-h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-orbit-border bg-orbit-surface p-4 transition duration-300 sm:p-5",
        "hover:border-purple-500/40 hover:bg-orbit-surface-strong",
        alert.status === "triggered" &&
          "border-purple-500/30 shadow-[0_0_32px_rgba(139,92,246,0.12)]",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.14em] text-orbit-accent">
            {ALERT_TYPE_LABELS[alert.type]}
          </p>
          <h3 className="mt-1 break-words text-base font-semibold text-orbit-foreground sm:text-lg">
            {alert.name}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-xs capitalize",
              SEVERITY_STYLES[alert.severity],
            )}
          >
            {alert.severity}
          </span>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-xs capitalize",
              STATUS_STYLES[alert.status],
            )}
          >
            {alert.status}
          </span>
        </div>
      </div>

      <dl className="relative mt-4 space-y-2 text-sm">
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-orbit-muted">Target</dt>
          <dd className="font-medium text-orbit-foreground">{alert.target}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-orbit-muted">Condition</dt>
          <dd className="text-orbit-foreground">{alert.condition}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-orbit-muted">Network</dt>
          <dd>{alert.network}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-orbit-muted">Last checked</dt>
          <dd>{alert.lastCheckedLabel}</dd>
        </div>
      </dl>

      <div className="relative mt-5 flex flex-col gap-2 sm:flex-row">
        <Link
          href={buildAgentChatUrl(alert.agentChatPrompt)}
          className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-2xl bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500"
        >
          Open in Agent Chat
          <ArrowUpRight className="size-4 opacity-80" />
        </Link>
      </div>
    </article>
  );
}

export function AlertsEmptyState() {
  return (
    <div className="rounded-[28px] border border-dashed border-orbit-border bg-orbit-surface/60 px-5 py-14 text-center sm:px-8">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-orbit-border bg-orbit-surface-strong">
        <BellOff className="size-6 text-orbit-muted" />
      </div>
      <p className="mt-4 text-lg font-medium text-orbit-foreground">
        No active alerts
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-orbit-muted">
        Create a watch rule for price moves, holder growth, whale entries, volume
        spikes, or wallet balance thresholds — then stage it with Aomi in Agent
        Chat.
      </p>
      <Link
        href={buildAgentChatUrl(
          "Help me set up Zora price and holder alerts on Base.",
        )}
        className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
      >
        Create first alert in Agent Chat
        <ArrowUpRight className="size-4 opacity-80" />
      </Link>
    </div>
  );
}
