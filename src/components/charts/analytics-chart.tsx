"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useOrbitStore } from "@/store/orbit-store";

export function AnalyticsChart() {
  const data = useOrbitStore((s) => s.analytics);
  const coin = useOrbitStore((s) => s.coin);
  const latest = data[data.length - 1]?.value ?? 0;
  const first = data[0]?.value ?? 1;
  const change = (((latest - first) / first) * 100).toFixed(1);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-purple-300">Analytics</p>
          <h2 className="text-2xl font-bold mt-1">
            {coin.name ? `${coin.name} Growth` : "Creator Coin Growth"}
          </h2>
        </div>

        <span className="text-green-300 text-sm">+{change}% today</span>
      </div>

      <div className="h-72 mt-6 min-h-[288px] w-full">
        <ResponsiveContainer width="100%" height="100%">
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
      </div>
    </section>
  );
}
