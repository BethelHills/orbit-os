"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AnalyticsCharts } from "@/components/analytics/analytics-charts";
import {
  AiSignalCards,
  MarketIntelligenceSection,
  WalletActivityCards,
} from "@/components/analytics/analytics-sections";
import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";
import { useAnalyticsDashboard } from "@/hooks/use-analytics-dashboard";
import { buildAgentChatUrl } from "@/lib/agent-chat-url";
import { ANALYTICS_TRENDING_PROMPT } from "@/lib/analytics-data";

export function AnalyticsWorkspace() {
  const data = useAnalyticsDashboard();

  return (
    <StandalonePageShell>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-purple-600/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-32 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <StandalonePageHeader
          title="Analytics"
          subtitle="Real-time intelligence across agent usage, Zora momentum, protocol activity, and wallet signals — structured for live Aomi and Zora feeds."
        />

        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
              {data.meta.source} data
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-orbit-muted">
              {data.meta.network}
            </span>
          </div>
          <Link
            href={buildAgentChatUrl(ANALYTICS_TRENDING_PROMPT)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
          >
            Trending Zora coins in Agent Chat
            <ArrowUpRight className="size-4 opacity-80" />
          </Link>
        </div>

        <div className="relative space-y-8 sm:space-y-10">
          <AnalyticsCharts
            data={{
              agentUsage: data.agentUsage,
              zoraTrending: data.zoraTrending,
              protocolActivity: data.protocolActivity,
            }}
          />
          <WalletActivityCards metrics={data.walletActivity} />
          <AiSignalCards signals={data.aiSignals} />
          <MarketIntelligenceSection items={data.marketIntelligence} />
        </div>
      </div>
    </StandalonePageShell>
  );
}
