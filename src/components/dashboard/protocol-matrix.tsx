"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useOrbitStore } from "@/store/orbit-store";

const protocols = [
  {
    name: "Zora",
    metric: "MOONJOY",
    value: "0.2 ETH",
    change: "+28.7%",
    positive: true,
    spark: [12, 18, 15, 22, 28, 24, 32],
    accent: "#a855f7",
    primary: true,
  },
  {
    name: "Aerodrome",
    metric: "Pool TVL",
    value: "$18.2M",
    change: "+4.2%",
    positive: true,
    spark: [8, 10, 9, 11, 12, 11, 13],
    accent: "#6366f1",
    primary: false,
  },
  {
    name: "Avantis",
    metric: "Risk Score",
    value: "Low",
    change: "-1.1%",
    positive: false,
    spark: [20, 19, 18, 17, 16, 17, 16],
    accent: "#22d3ee",
    primary: false,
  },
  {
    name: "Base",
    metric: "Network",
    value: "Online",
    change: "Stable",
    positive: true,
    spark: [10, 10, 11, 10, 11, 10, 11],
    accent: "#3b82f6",
    primary: false,
  },
];

export function ProtocolMatrix() {
  const coin = useOrbitStore((s) => s.coin);

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {protocols.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className={`glass-strong relative overflow-hidden rounded-2xl p-4 ${
            p.primary ? "neon-border" : ""
          }`}
        >
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl"
            style={{ background: `${p.accent}33` }}
          />

          <div className="relative flex items-start justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {p.name}
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {p.primary && coin.symbol ? coin.symbol : p.metric}
              </p>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                p.positive
                  ? "bg-green-500/15 text-green-300"
                  : "bg-red-500/15 text-red-300"
              }`}
            >
              {p.change}
            </span>
          </div>

          <p className="relative mt-2 text-2xl font-bold tracking-tight text-white">
            {p.primary && coin.initialPriceEth
              ? `${coin.initialPriceEth} ETH`
              : p.value}
          </p>

          <div className="relative mt-3 h-12 w-full min-h-12">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={48}>
              <AreaChart
                data={p.spark.map((v, idx) => ({ v, idx }))}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`grad-${p.name}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={p.accent} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={p.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={p.accent}
                  fill={`url(#grad-${p.name})`}
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
