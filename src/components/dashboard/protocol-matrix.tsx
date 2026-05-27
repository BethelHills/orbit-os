"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { SSR_SAFE_INITIAL } from "@/lib/motion";
import { ClientChart } from "@/components/charts/client-chart";
import { ProtocolIcon } from "@/components/dashboard/protocol-icon";
import { useCoin } from "@/store/orbit-store";
import type { ProtocolName } from "@/lib/protocol-logos";

const protocols: {
  name: ProtocolName;
  tvl: string;
  change: string;
  positive: boolean;
  spark: number[];
  accent: string;
}[] = [
  {
    name: "Aerodrome",
    tvl: "$1.23B",
    change: "+34.6%",
    positive: true,
    spark: [8, 12, 10, 18, 22, 20, 28],
    accent: "#6366f1",
  },
  {
    name: "Zora",
    tvl: "$892M",
    change: "+28.7%",
    positive: true,
    spark: [12, 18, 15, 22, 28, 24, 32],
    accent: "#a855f7",
  },
  {
    name: "Limitless",
    tvl: "$456M",
    change: "+18.2%",
    positive: true,
    spark: [6, 8, 10, 9, 14, 13, 16],
    accent: "#22d3ee",
  },
  {
    name: "Avantis",
    tvl: "$312M",
    change: "+12.4%",
    positive: true,
    spark: [10, 11, 10, 12, 11, 13, 14],
    accent: "#3b82f6",
  },
];

export function ProtocolMatrix() {
  const coin = useCoin();

  const zoraTvl =
    coin.volume24hEth > 0
      ? `$${((coin.volume24hEth * 3200) / 1_000_000).toFixed(1)}M`
      : "$892M";
  const zoraChange =
    coin.holderCount > 0
      ? `${coin.holderCount.toLocaleString()} holders`
      : "+28.7%";

  const cards = protocols.map((p) =>
    p.name === "Zora"
      ? { ...p, tvl: zoraTvl, change: zoraChange, positive: true }
      : p
  );

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((p, i) => (
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
            <ProtocolIcon name={p.name} />
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

          <ClientChart className="relative mt-2 h-10 w-full min-h-10">
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
          </ClientChart>
        </motion.div>
      ))}
    </section>
  );
}
