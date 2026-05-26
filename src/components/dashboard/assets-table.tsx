"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { SSR_SAFE_INITIAL } from "@/lib/motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const assets = [
  {
    name: "VITALIK",
    network: "Base",
    price: "$0.042",
    change: "+12.4%",
    positive: true,
    holdings: "24,500",
    value: "$1,029",
    spark: [4, 6, 5, 8, 7, 9, 10],
    accent: "#6366f1",
    icon: "V",
    iconBg: "from-indigo-500 to-purple-600",
  },
  {
    name: "BASECAT",
    network: "Base",
    price: "$0.018",
    change: "+8.7%",
    positive: true,
    holdings: "52,000",
    value: "$936",
    spark: [3, 4, 5, 4, 6, 5, 7],
    accent: "#3b82f6",
    icon: "B",
    iconBg: "from-blue-500 to-cyan-600",
  },
  {
    name: "MOONJOY",
    network: "Zora",
    price: "$0.2",
    change: "+28.7%",
    positive: true,
    holdings: "1.00",
    value: "$640",
    spark: [6, 8, 10, 12, 14, 13, 16],
    accent: "#a855f7",
    icon: "M",
    iconBg: "from-purple-500 to-violet-600",
  },
  {
    name: "AVNT",
    network: "Avantis",
    price: "$1.24",
    change: "-2.1%",
    positive: false,
    holdings: "320",
    value: "$397",
    spark: [8, 7, 6, 7, 5, 6, 5],
    accent: "#22d3ee",
    icon: "A",
    iconBg: "from-cyan-500 to-teal-600",
  },
];

function MiniSparkline({ data, accent }: { data: number[]; accent: string }) {
  return (
    <div className="h-8 w-20 min-w-20">
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
    </div>
  );
}

export function AssetsTable() {
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
              key={row.name}
              className="border-white/5 hover:bg-white/[0.02]"
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
              <TableCell className="text-slate-300">{row.price}</TableCell>
              <TableCell
                className={row.positive ? "text-green-300" : "text-red-300"}
              >
                {row.change}
              </TableCell>
              <TableCell className="hidden text-slate-300 md:table-cell">
                {row.holdings}
              </TableCell>
              <TableCell className="font-medium text-white">{row.value}</TableCell>
              <TableCell className="text-right">
                <MiniSparkline data={row.spark} accent={row.accent} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="border-t border-white/5 p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/25 bg-purple-500/10 py-3 text-sm font-medium text-purple-200 transition hover:bg-purple-500/20">
          View Full Portfolio
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.section>
  );
}
