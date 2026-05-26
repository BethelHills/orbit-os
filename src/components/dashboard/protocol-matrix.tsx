"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { SSR_SAFE_INITIAL } from "@/lib/motion";

const protocols = [
  {
    name: "Aerodrome",
    tvl: "$1.23B",
    change: "+34.6%",
    positive: true,
    spark: [8, 12, 10, 18, 22, 20, 28],
    accent: "#6366f1",
    icon: "A",
    iconBg: "from-indigo-500 to-blue-600",
  },
  {
    name: "Zora",
    tvl: "$892M",
    change: "+28.7%",
    positive: true,
    spark: [12, 18, 15, 22, 28, 24, 32],
    accent: "#a855f7",
    icon: "Z",
    iconBg: "from-purple-500 to-violet-600",
  },
  {
    name: "Limitless",
    tvl: "$456M",
    change: "+18.2%",
    positive: true,
    spark: [6, 8, 10, 9, 14, 13, 16],
    accent: "#22d3ee",
    icon: "L",
    iconBg: "from-cyan-500 to-teal-600",
  },
  {
    name: "Avantis",
    tvl: "$312M",
    change: "+12.4%",
    positive: true,
    spark: [10, 11, 10, 12, 11, 13, 14],
    accent: "#3b82f6",
    icon: "Av",
    iconBg: "from-blue-500 to-indigo-600",
  },
];

export function ProtocolMatrix() {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {protocols.map((p, i) => (
        <motion.div
          key={p.name}
          initial={SSR_SAFE_INITIAL}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className="glass-strong relative overflow-hidden rounded-2xl p-4"
        >
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl"
            style={{ background: `${p.accent}33` }}
          />

          <div className="relative flex items-center gap-2.5">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${p.iconBg} text-[11px] font-bold text-white`}
            >
              {p.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white">{p.name}</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">TVL</p>
            </div>
            <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-medium text-green-300">
              {p.change}
            </span>
          </div>

          <p className="relative mt-3 text-2xl font-bold tracking-tight text-white">
            {p.tvl}
          </p>

          <div className="relative mt-2 h-10 w-full min-h-10">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={40}>
              <AreaChart
                data={p.spark.map((v, idx) => ({ v, idx }))}
                margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`grad-${p.name}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={p.accent} stopOpacity={0.45} />
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
