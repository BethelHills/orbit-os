import { KeyRound } from "lucide-react";

import { IntegrationStatusBadge } from "@/components/integrations/integration-status-badge";
import type { OpenRouterByokStatus } from "@/lib/integrations-data";

type OpenRouterByokCardProps = {
  openRouter: OpenRouterByokStatus;
};

export function OpenRouterByokCard({ openRouter }: OpenRouterByokCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-dashed border-orbit-border bg-orbit-surface/60 p-5 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 bottom-0 h-28 w-28 rounded-full bg-amber-500/10 blur-3xl"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10">
            <KeyRound className="size-4 text-amber-200" />
          </span>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
              BYOK placeholder
            </p>
            <h2 className="mt-1 text-lg font-semibold">{openRouter.provider}</h2>
          </div>
        </div>
        <IntegrationStatusBadge status={openRouter.status} />
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-orbit-muted">
        {openRouter.message}
      </p>

      <dl className="relative mt-4 space-y-2 text-sm">
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-orbit-muted">Configured</dt>
          <dd className="font-medium text-orbit-foreground">
            {openRouter.configured ? "Yes" : "No"}
          </dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-orbit-muted">Model routing</dt>
          <dd>{openRouter.modelHint ?? "Not set — add OPENROUTER_API_KEY"}</dd>
        </div>
      </dl>
    </article>
  );
}
