"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AlertCard, AlertsEmptyState } from "@/components/alerts/alert-card";
import { AlertHistoryTimeline } from "@/components/alerts/alert-history-timeline";
import { CreateAlertPanel } from "@/components/alerts/create-alert-panel";
import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";
import { useAlertsWatchtower } from "@/hooks/use-alerts-watchtower";
import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import { WATCHTOWER_DEFAULT_PROMPT } from "@/lib/alerts-data";

export function AlertsWorkspace() {
  const data = useAlertsWatchtower();
  const activeCount = data.alerts.filter((a) => a.status === "active").length;
  const triggeredCount = data.alerts.filter(
    (a) => a.status === "triggered",
  ).length;

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
          title="AI Watchtower"
          subtitle="Monitor price moves, holder growth, whale entries, volume spikes, and wallet balance thresholds — staged through Aomi on Base."
        />

        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
              {data.meta.source} data
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              {activeCount} active
            </span>
            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-200">
              {triggeredCount} triggered
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-orbit-muted">
              {data.meta.network}
            </span>
          </div>
          <Link
            href={buildAgentChatUrl(WATCHTOWER_DEFAULT_PROMPT)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
          >
            Review alerts in Agent Chat
            <ArrowUpRight className="size-4 opacity-80" />
          </Link>
        </div>

        <div className="relative grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_min(100%,340px)] xl:gap-8">
          <section className="min-w-0 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
                Watch rules
              </p>
              <h2 className="mt-1 text-xl font-semibold">Active alerts</h2>
            </div>

            {data.alerts.length === 0 ? (
              <AlertsEmptyState />
            ) : (
              <div className="grid min-w-0 gap-4 md:grid-cols-2">
                {data.alerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            )}
          </section>

          <CreateAlertPanel />
        </div>

        <section className="relative mt-8 space-y-4 sm:mt-10">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
              History
            </p>
            <h2 className="mt-1 text-xl font-semibold">Alert timeline</h2>
            <p className="mt-2 max-w-2xl text-sm text-orbit-muted">
              Recent triggers, pauses, and watch rule changes detected by OrbitOS
              and Aomi.
            </p>
          </div>
          <AlertHistoryTimeline events={data.history} />
        </section>
      </div>
    </StandalonePageShell>
  );
}
