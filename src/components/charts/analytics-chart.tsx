"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { time: "12AM", value: 1200 },
  { time: "4AM", value: 1800 },
  { time: "8AM", value: 2400 },
  { time: "12PM", value: 3900 },
  { time: "4PM", value: 3200 },
  { time: "8PM", value: 5200 },
  { time: "12AM", value: 6100 },
];

export function AnalyticsChart() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-purple-300">Analytics</p>
          <h2 className="text-2xl font-bold mt-1">Creator Coin Growth</h2>
        </div>

        <span className="text-green-300 text-sm">+28.7% today</span>
      </div>

      <div className="h-72 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="time" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
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
