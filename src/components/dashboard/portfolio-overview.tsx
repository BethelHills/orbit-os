"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
} from "recharts";

const portfolioData = [
  { t: "Mon", v: 14200 },
  { t: "Tue", v: 15100 },
  { t: "Wed", v: 15800 },
  { t: "Thu", v: 16200 },
  { t: "Fri", v: 17100 },
  { t: "Sat", v: 17800 },
  { t: "Sun", v: 18450 },
];

const volumeData = [
  { t: "Mon", v: 4200 },
  { t: "Tue", v: 5100 },
  { t: "Wed", v: 6800 },
  { t: "Thu", v: 5900 },
  { t: "Fri", v: 7200 },
  { t: "Sat", v: 8100 },
  { t: "Sun", v: 7892 },
];

export function PortfolioOverview() {
  return (
    <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong overflow-hidden rounded-2xl p-5"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
              Total Portfolio Value
            </p>
            <p className="mt-1 text-3xl font-bold text-white">$18,450.75</p>
            <p className="mt-1 text-sm font-medium text-green-400">+16.2%</p>
          </div>
        </div>
        <div className="mt-4 h-36 w-full min-h-36">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={144}>
            <AreaChart data={portfolioData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="#a855f7"
                fill="url(#portfolioGrad)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="glass-strong overflow-hidden rounded-2xl p-5"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
            24H Volume
          </p>
          <p className="mt-1 text-3xl font-bold text-white">$7,892.34</p>
          <p className="mt-1 text-sm font-medium text-green-400">+22.4%</p>
        </div>
        <div className="mt-4 h-36 w-full min-h-36">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={144}>
            <BarChart data={volumeData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <Bar dataKey="v" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  );
}
