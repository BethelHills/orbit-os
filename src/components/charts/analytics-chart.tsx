"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClientChart } from "@/components/charts/client-chart";
import { useAnalytics, useCoin } from "@/store/orbit-store";

export function AnalyticsChart() {
  const data = useAnalytics();
  const coin = useCoin();
  const latest = data[data.length - 1]?.value ?? 0;
  const first = data[0]?.value ?? 1;
  const change = (((latest - first) / first) * 100).toFixed(1);

  return (
    <section className="glass rounded-2xl p-4 sm:rounded-3xl sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-purple-300">Analytics</p>
          <h2 className="mt-1 truncate text-xl font-bold sm:text-2xl">
            {coin.name ? `${coin.name} Growth` : "Creator Coin Growth"}
          </h2>
        </div>

        <span className="shrink-0 text-sm text-green-300">+{change}% today</span>
      </div>

      <ClientChart className="mt-4 h-56 min-h-[224px] w-full sm:mt-6 sm:h-72 sm:min-h-[288px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={data}>
            <XAxis dataKey="time" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                background: "#0a0a1f",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#a855f7"
              fill="#7c3aed"
              fillOpacity={0.25}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ClientChart>
    </section>
  );
}
