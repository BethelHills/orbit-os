"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { SSR_SAFE_INITIAL } from "@/lib/motion";
import { ClientChart } from "@/components/charts/client-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAssets } from "@/store/orbit-store";

function MiniSparkline({ data, accent }: { data: number[]; accent: string }) {
  return (
    <ClientChart className="h-8 w-20 min-w-20">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={32}>
        <AreaChart data={data.map((v, idx) => ({ v, idx }))}>
          <Area
            type="monotone"
            dataKey="v"
            stroke={accent}
            fill={`${accent}33`}
            strokeWidth={1.5}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ClientChart>
  );
}

export function AssetsTable() {
  const assets = useAssets();

  return (
    <motion.section
      initial={SSR_SAFE_INITIAL}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass-strong overflow-hidden rounded-2xl"
    >
      <div className="border-b border-white/5 px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
          Top Assets
        </p>
        <h2 className="text-lg font-semibold text-white">Portfolio Holdings</h2>
      </div>

      <div className="overflow-x-auto">
        <Table>
        <TableHeader>
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="text-slate-500">Asset</TableHead>
            <TableHead className="text-slate-500">Price</TableHead>
            <TableHead className="text-slate-500">24H %</TableHead>
            <TableHead className="hidden text-slate-500 md:table-cell">Holdings</TableHead>
            <TableHead className="text-slate-500">Value</TableHead>
            <TableHead className="text-right text-slate-500">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((row) => (
            <TableRow
              key={row.symbol}
              className={`border-white/5 hover:bg-white/[0.02] ${
                row.isPrimary ? "bg-purple-500/5" : ""
              }`}
            >
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${row.iconBg} text-xs font-bold text-white`}
                  >
                    {row.icon}
                  </div>
                  <div>
                    <p className="font-medium text-white">{row.name}</p>
                    <p className="text-[10px] text-slate-500">{row.network}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-slate-300">{row.priceLabel}</TableCell>
              <TableCell
                className={row.positive ? "text-green-300" : "text-red-300"}
              >
                {row.changeLabel}
              </TableCell>
              <TableCell className="hidden text-slate-300 md:table-cell">
                {row.holdings}
              </TableCell>
              <TableCell className="font-medium text-white">{row.valueLabel}</TableCell>
              <TableCell className="text-right">
                <MiniSparkline data={row.spark} accent={row.accent} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>

      <div className="border-t border-white/5 p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/25 bg-purple-500/10 py-3 text-sm font-medium text-purple-200 transition hover:bg-purple-500/20">
          View Full Portfolio
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.section>
  );
}
