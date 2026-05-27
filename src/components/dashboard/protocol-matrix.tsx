"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { SSR_SAFE_INITIAL } from "@/lib/motion";
import { ClientChart } from "@/components/charts/client-chart";
import { ProtocolIcon } from "@/components/dashboard/protocol-icon";
import { useLiveMetrics } from "@/hooks/use-live-metrics";
import type { ProtocolName } from "@/lib/protocol-logos";

const protocols: {
  name: ProtocolName;
  accent: string;
}[] = [
  { name: "Aerodrome", accent: "#6366f1" },
  { name: "Zora", accent: "#a855f7" },
  { name: "Limitless", accent: "#22d3ee" },
  { name: "Avantis", accent: "#3b82f6" },
];

function normalizeSpark(values: number[]) {
  if (!values.length) return [0];
  const max = Math.max(...values, 1);
  return values.map((value) => Math.round((value / max) * 32));
}

export function ProtocolMatrix() {
  const live = useLiveMetrics();

  const cards = protocols.map((p) => {
    if (p.name === "Zora") {
      return {
        ...p,
        subtitle: "24H VOLUME",
        tvl: live.zoraVolumeDisplay,
        change: `${live.zora.holderCount.toLocaleString()} holders`,
        positive: live.zora.holderCount > 0,
        spark: normalizeSpark(live.zoraSpark),
      };
    }

    if (p.name === "Aerodrome") {
      return {
        ...p,
        subtitle: "BASE GAS",
        tvl: live.base.gasPriceLabel,
        change: live.base.healthy ? "Base live" : "Wrong network",
        positive: live.base.healthy,
        spark: normalizeSpark(live.zoraSpark.slice(-5)),
      };
    }

    if (p.name === "Limitless") {
      return {
        ...p,
        subtitle: "AOMI ACTIONS",
        tvl: String(live.aomi.successful),
        change:
          live.aomi.pending > 0
            ? `${live.aomi.pending} pending`
            : `${live.aomi.total} logged`,
        positive: live.aomi.successful > 0,
        spark: normalizeSpark(
          Array.from({ length: 7 }, (_, i) => Math.max(live.aomi.successful - (6 - i), 0))
        ),
      };
    }

    return {
      ...p,
      subtitle: "WALLET",
      tvl: live.wallet.connected ? live.wallet.balanceLabel : "Offline",
      change: live.wallet.lastTxShort ?? "No txs yet",
      positive: live.wallet.connected,
      spark: normalizeSpark(live.zoraSpark.slice(-5)),
    };
  });

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
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                {p.subtitle}
              </p>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                p.positive
                  ? "bg-green-500/15 text-green-300"
                  : "bg-white/10 text-slate-400"
              }`}
            >
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
