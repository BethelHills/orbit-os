"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
} from "recharts";

import { ClientChart } from "@/components/charts/client-chart";
import { usePortfolio } from "@/store/orbit-store";

function formatUsd(value: number) {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function PortfolioOverview() {
  const portfolio = usePortfolio();

  return (
    <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <div className="glass-strong overflow-hidden rounded-2xl p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
              Total Portfolio Value
            </p>
            <p className="mt-1 text-3xl font-bold text-white">
              {formatUsd(portfolio.totalValueUsd)}
            </p>
            <p className="mt-1 text-sm font-medium text-green-400">
              {portfolio.portfolioChangePct > 0
                ? `+${portfolio.portfolioChangePct.toFixed(1)}%`
                : "Live from Zora"}
            </p>
          </div>
        </div>
        <ClientChart className="mt-4 h-36 w-full min-h-36">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={144}>
            <AreaChart data={portfolio.history} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
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
        </ClientChart>
      </div>

      <div className="glass-strong overflow-hidden rounded-2xl p-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
            24H Volume
          </p>
          <p className="mt-1 text-3xl font-bold text-white">
            {formatUsd(portfolio.volume24hUsd)}
          </p>
            <p className="mt-1 text-sm font-medium text-green-400">
              {portfolio.volumeChangePct > 0
                ? `+${portfolio.volumeChangePct.toFixed(1)}%`
                : "Live from Zora"}
            </p>
        </div>
        <ClientChart className="mt-4 h-36 w-full min-h-36">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={144}>
            <BarChart data={portfolio.volumeHistory} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <Bar dataKey="v" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </ClientChart>
      </div>
    </section>
  );
}
