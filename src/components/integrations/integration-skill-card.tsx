import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { IntegrationStatusBadge } from "@/components/integrations/integration-status-badge";
import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import type { IntegrationCard } from "@/lib/integrations-data";

type IntegrationSkillCardProps = {
  integration: IntegrationCard;
};

export function IntegrationSkillCard({ integration }: IntegrationSkillCardProps) {
  return (
    <article className="group relative flex min-h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-orbit-border bg-orbit-surface p-4 transition duration-300 sm:p-5 hover:border-purple-500/40 hover:bg-orbit-surface-strong">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.14em] text-orbit-accent">
            {integration.category}
          </p>
          <h3 className="mt-1 font-mono text-base font-semibold text-orbit-foreground sm:text-lg">
            {integration.name}
          </h3>
        </div>
        <IntegrationStatusBadge status={integration.status} />
      </div>

      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-orbit-muted">
        {integration.description}
      </p>

      {integration.repositoryUrl ? (
        <Link
          href={integration.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-4 inline-flex items-center gap-1.5 text-xs text-orbit-accent transition hover:text-purple-300"
        >
          View docs / repo
          <ExternalLink className="size-3.5" />
        </Link>
      ) : null}

      <div className="relative mt-5">
        <Link
          href={buildAgentChatUrl(
            `Tell me about the ${integration.name} integration`,
          )}
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-2xl border border-orbit-border bg-orbit-surface-strong px-4 py-2 text-sm font-medium text-orbit-foreground transition hover:border-purple-500/40 hover:bg-orbit-surface"
        >
          Ask Agent Chat
          <ArrowUpRight className="size-4 opacity-80" />
        </Link>
      </div>
    </article>
  );
}
