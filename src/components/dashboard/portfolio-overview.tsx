"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useOrbitStore } from "@/store/orbit-store";

export function PortfolioOverview() {
  const coin = useOrbitStore((s) => s.coin);
  const analytics = useOrbitStore((s) => s.analytics);
  const latest = analytics[analytics.length - 1]?.value ?? 6100;

  const stats = [
    {
      label: "Portfolio Value",
      value: latest,
      prefix: "$",
      suffix: "",
      color: "text-purple-300",
    },
    {
      label: "24h Volume",
      value: coin.volume24hEth,
      prefix: "",
      suffix: " ETH",
      color: "text-cyan-300",
    },
    {
      label: "Holders",
      value: coin.holderCount,
      prefix: "",
      suffix: "",
      color: "text-green-300",
    },
    {
      label: "Price Alert",
      value: coin.priceAlertEth ?? 0.5,
      prefix: "",
      suffix: " ETH",
      color: "text-blue-300",
    },
  ];

  return (
    <section className="glass-strong rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Portfolio
          </p>
          <h2 className="text-lg font-semibold text-white">Creator Overview</h2>
        </div>
        <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-200">
          {coin.name ?? "MOONJOY"} · Base
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="rounded-xl border border-white/5 bg-black/30 p-4"
          >
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className={`mt-2 text-xl font-bold ${stat.color}`}>
              {stat.prefix}
              <CountUp
                end={stat.value}
                decimals={stat.suffix.includes("ETH") ? 1 : 0}
                duration={1.2}
              />
              {stat.suffix}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
