"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BackendStatusCard } from "@/components/integrations/backend-status-card";
import { InstalledSkillsList } from "@/components/integrations/installed-skills-list";
import { IntegrationSkillCard } from "@/components/integrations/integration-skill-card";
import { IntegrationsEmptyState } from "@/components/integrations/integrations-empty-state";
import { OpenRouterByokCard } from "@/components/integrations/openrouter-byok-card";
import { WalletStackStatusPanel } from "@/components/integrations/wallet-stack-status-panel";
import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";
import { useIntegrationsHub } from "@/hooks/use-integrations-hub";
import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import { INTEGRATIONS_DEFAULT_PROMPT } from "@/lib/integrations-data";

export function IntegrationsWorkspace() {
  const data = useIntegrationsHub();
  const installedCount = data.installedSkills.filter(
    (s) => s.status === "installed" || s.status === "active",
  ).length;
  const activeCards = data.integrationCards.filter(
    (c) => c.status === "active",
  ).length;
  const showError =
    Boolean(data.error) &&
    data.installedSkills.length === 0 &&
    data.integrationCards.length === 0;
  const showEmpty =
    !showError &&
    data.installedSkills.length === 0 &&
    data.integrationCards.length === 0;

  return (
    <StandalonePageShell>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-purple-600/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-28 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <StandalonePageHeader
          title="Skills Hub"
          subtitle="Manage installed Aomi skills, Web3 wallet stack, runtime backend, and optional agent toolkits connected to OrbitOS."
        />

        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
              {data.meta.source} data
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              {installedCount} skills installed
            </span>
            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-200">
              {activeCards} active toolkits
            </span>
            <span
              className={
                data.backend.status === "online"
                  ? "rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200"
                  : "rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-300"
              }
            >
              Backend {data.backend.status}
            </span>
          </div>
          <Link
            href={buildAgentChatUrl(INTEGRATIONS_DEFAULT_PROMPT)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
          >
            What apps and tools are installed?
            <ArrowUpRight className="size-4 opacity-80" />
          </Link>
        </div>

        {showError ? (
          <IntegrationsEmptyState variant="error" message={data.error ?? undefined} />
        ) : showEmpty ? (
          <IntegrationsEmptyState />
        ) : (
          <div className="relative space-y-8 sm:space-y-10">
            <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_min(100%,380px)] xl:gap-8">
              <div className="min-w-0 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
                    Workspace
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">
                    Installed Aomi skills
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-orbit-muted">
                    Skills available under `.agents/skills/` for Cursor and Agent
                    Chat workflows.
                  </p>
                </div>
                <InstalledSkillsList skills={data.installedSkills} />
              </div>

              <div className="min-w-0 space-y-4">
                <BackendStatusCard backend={data.backend} loading={data.loading} />
                <WalletStackStatusPanel stack={data.walletStack} />
                <OpenRouterByokCard openRouter={data.openRouter} />
              </div>
            </section>

            <section className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
                  Toolkits
                </p>
                <h2 className="mt-1 text-xl font-semibold">Integration cards</h2>
                <p className="mt-2 max-w-2xl text-sm text-orbit-muted">
                  Agent frameworks, intent APIs, and payment protocols you can wire
                  into OrbitOS alongside Aomi.
                </p>
              </div>
              <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {data.integrationCards.map((integration) => (
                  <IntegrationSkillCard
                    key={integration.id}
                    integration={integration}
                  />
                ))}
              </div>
            </section>

            {data.error ? (
              <div className="rounded-[24px] border border-amber-500/25 bg-amber-500/[0.06] px-4 py-3 text-sm text-amber-200">
                {data.error}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </StandalonePageShell>
  );
}
