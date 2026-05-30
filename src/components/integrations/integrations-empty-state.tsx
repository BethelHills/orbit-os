import Link from "next/link";
import { AlertTriangle, ArrowUpRight, Plug } from "lucide-react";

import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import { INTEGRATIONS_DEFAULT_PROMPT } from "@/lib/integrations-data";

type IntegrationsEmptyStateProps = {
  variant?: "empty" | "error";
  message?: string;
};

export function IntegrationsEmptyState({
  variant = "empty",
  message,
}: IntegrationsEmptyStateProps) {
  const isError = variant === "error";

  return (
    <div
      className={
        isError
          ? "rounded-[28px] border border-red-500/25 bg-red-500/[0.04] px-5 py-14 text-center sm:px-8"
          : "rounded-[28px] border border-dashed border-orbit-border bg-orbit-surface/60 px-5 py-14 text-center sm:px-8"
      }
    >
      <div
        className={
          isError
            ? "mx-auto flex size-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10"
            : "mx-auto flex size-14 items-center justify-center rounded-2xl border border-orbit-border bg-orbit-surface-strong"
        }
      >
        {isError ? (
          <AlertTriangle className="size-6 text-red-300" />
        ) : (
          <Plug className="size-6 text-orbit-muted" />
        )}
      </div>
      <p className="mt-4 text-lg font-medium text-orbit-foreground">
        {isError ? "Integration check failed" : "No integrations configured"}
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-orbit-muted">
        {message ??
          (isError
            ? "OrbitOS could not verify one or more integration endpoints. Retry from Agent Chat or check env configuration."
            : "Install Aomi skills and connect wallet providers to populate the Skills Hub.")}
      </p>
      <Link
        href={buildAgentChatUrl(INTEGRATIONS_DEFAULT_PROMPT)}
        className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
      >
        Ask Agent Chat about installed tools
        <ArrowUpRight className="size-4 opacity-80" />
      </Link>
    </div>
  );
}
