import { Cloud, Gauge } from "lucide-react";

import { IntegrationStatusBadge } from "@/components/integrations/integration-status-badge";
import type { BackendStatus } from "@/lib/integrations-data";
import { cn } from "@/lib/utils";

const SERVICE_DOT: Record<BackendStatus["status"], string> = {
  online: "bg-emerald-400",
  degraded: "bg-amber-400",
  offline: "bg-red-400",
  unknown: "bg-orbit-muted",
};

type BackendStatusCardProps = {
  backend: BackendStatus;
  loading?: boolean;
};

export function BackendStatusCard({ backend, loading }: BackendStatusCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-orbit-border bg-orbit-surface-strong p-5 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 top-0 h-32 w-32 rounded-full bg-purple-600/15 blur-3xl"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
            Runtime
          </p>
          <h2 className="mt-1 text-lg font-semibold">Aomi backend</h2>
          <p className="mt-2 break-all font-mono text-xs text-orbit-accent sm:text-sm">
            {backend.url}
          </p>
        </div>
        <IntegrationStatusBadge status={backend.integrationStatus} />
      </div>

      <div className="relative mt-5 flex items-center gap-3 rounded-2xl border border-orbit-border bg-orbit-surface px-4 py-3">
        <span
          className={cn(
            "size-2.5 shrink-0 rounded-full",
            loading ? "animate-pulse bg-orbit-muted" : SERVICE_DOT[backend.status],
          )}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium capitalize text-orbit-foreground">
            {loading ? "Checking…" : backend.status}
          </p>
          <p className="mt-0.5 text-sm text-orbit-muted">{backend.message}</p>
        </div>
        {backend.latencyMs !== null ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs text-cyan-200">
            <Gauge className="size-3.5" />
            {backend.latencyMs}ms
          </span>
        ) : null}
      </div>

      <dl className="relative mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div className="flex items-center gap-2 rounded-2xl border border-orbit-border bg-orbit-surface px-3 py-2.5">
          <Cloud className="size-4 shrink-0 text-orbit-muted" />
          <div>
            <dt className="text-xs text-orbit-muted">Last checked</dt>
            <dd className="font-medium">{backend.lastCheckedLabel}</dd>
          </div>
        </div>
        <div className="rounded-2xl border border-orbit-border bg-orbit-surface px-3 py-2.5">
          <dt className="text-xs text-orbit-muted">Env var</dt>
          <dd className="mt-0.5 font-mono text-xs">NEXT_PUBLIC_BACKEND_URL</dd>
        </div>
      </dl>
    </article>
  );
}
