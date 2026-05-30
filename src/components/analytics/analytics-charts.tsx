"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AnalyticsChartPanel } from "@/components/analytics/analytics-chart-panel";
import {
  ANALYTICS_AXIS_TICK,
  ANALYTICS_CHART_TOOLTIP_STYLE,
  type AnalyticsDashboardData,
} from "@/lib/analytics-data";

type AnalyticsChartsProps = {
  data: Pick<
    AnalyticsDashboardData,
    "agentUsage" | "zoraTrending" | "protocolActivity"
  >;
};

function formatUsd(value: number) {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  const agentTotal = data.agentUsage.reduce((sum, p) => sum + p.value, 0);
  const topZora = [...data.zoraTrending].sort(
    (a, b) => b.volumeUsd - a.volumeUsd,
  )[0];

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-2 lg:gap-5 xl:gap-6">
      <AnalyticsChartPanel
        title="Agent usage"
        subtitle="Aomi sessions and prompts routed through OrbitOS"
        badge={`${agentTotal} this week`}
        badgeClassName="border-purple-500/30 bg-purple-500/10 text-purple-200"
        className="lg:col-span-2"
        chartClassName="mt-4 h-56 min-h-[224px] w-full min-w-0 sm:mt-5 sm:h-72 sm:min-h-[288px]"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart
            data={data.agentUsage}
            margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
          >
            <defs>
              <linearGradient id="agentUsageGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="label" tick={ANALYTICS_AXIS_TICK} />
            <YAxis tick={ANALYTICS_AXIS_TICK} width={32} />
            <Tooltip contentStyle={ANALYTICS_CHART_TOOLTIP_STYLE} />
            <Area
              type="monotone"
              dataKey="value"
              name="Sessions"
              stroke="#a855f7"
              fill="url(#agentUsageGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </AnalyticsChartPanel>

      <AnalyticsChartPanel
        title="Zora trending coins"
        subtitle="24h volume on Base creator coins"
        badge={topZora ? `Top: ${topZora.symbol}` : undefined}
        badgeClassName="border-cyan-500/30 bg-cyan-500/10 text-cyan-200"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={data.zoraTrending}
            margin={{ top: 8, right: 4, left: -12, bottom: 0 }}
          >
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="symbol"
              tick={ANALYTICS_AXIS_TICK}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={48}
            />
            <YAxis
              tick={ANALYTICS_AXIS_TICK}
              width={40}
              tickFormatter={formatUsd}
            />
            <Tooltip
              contentStyle={ANALYTICS_CHART_TOOLTIP_STYLE}
              formatter={(value) =>
                formatUsd(typeof value === "number" ? value : Number(value ?? 0))
              }
            />
            <Bar
              dataKey="volumeUsd"
              name="24h volume"
              fill="#22d3ee"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </AnalyticsChartPanel>

      <AnalyticsChartPanel
        title="Protocol activity"
        subtitle="Agent sessions vs staged actions by protocol"
        badge="Base + bridges"
        badgeClassName="border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={data.protocolActivity}
            margin={{ top: 8, right: 4, left: -12, bottom: 0 }}
          >
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="protocol" tick={ANALYTICS_AXIS_TICK} />
            <YAxis tick={ANALYTICS_AXIS_TICK} width={32} />
            <Tooltip contentStyle={ANALYTICS_CHART_TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
            <Bar
              dataKey="sessions"
              name="Sessions"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
            <Bar
              dataKey="actions"
              name="Actions"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </AnalyticsChartPanel>
    </div>
  );
}
