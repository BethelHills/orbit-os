"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrbitStore } from "@/store/orbit-store";

const assets = [
  {
    name: "MOONJOY",
    protocol: "Zora",
    type: "Creator Coin",
    balance: "1.00",
    value: "$1,220",
    change: "+28.7%",
    positive: true,
  },
  {
    name: "ETH Pool",
    protocol: "Zora",
    type: "Liquidity",
    balance: "0.2",
    value: "$640",
    change: "+3.1%",
    positive: true,
  },
  {
    name: "AERO LP",
    protocol: "Aerodrome",
    type: "LP Token",
    balance: "842",
    value: "$412",
    change: "-0.8%",
    positive: false,
  },
  {
    name: "BASE",
    protocol: "Base",
    type: "Gas",
    balance: "0.05",
    value: "$180",
    change: "—",
    positive: true,
  },
];

export function AssetsTable() {
  const coin = useOrbitStore((s) => s.coin);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-strong overflow-hidden rounded-2xl"
    >
      <div className="border-b border-white/5 px-5 py-4">
        <p className="text-xs uppercase tracking-wider text-slate-500">Assets</p>
        <h2 className="text-lg font-semibold text-white">Creator Holdings</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="text-slate-500">Asset</TableHead>
            <TableHead className="text-slate-500">Protocol</TableHead>
            <TableHead className="hidden text-slate-500 sm:table-cell">Type</TableHead>
            <TableHead className="text-slate-500">Balance</TableHead>
            <TableHead className="text-slate-500">Value</TableHead>
            <TableHead className="text-right text-slate-500">24h</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((row, i) => (
            <TableRow
              key={row.name}
              className="border-white/5 hover:bg-white/[0.02]"
            >
              <TableCell className="font-medium text-white">
                {i === 0 && coin.symbol ? coin.symbol : row.name}
              </TableCell>
              <TableCell className="text-slate-400">{row.protocol}</TableCell>
              <TableCell className="hidden text-slate-400 sm:table-cell">
                {row.type}
              </TableCell>
              <TableCell className="text-slate-300">{row.balance}</TableCell>
              <TableCell className="text-white">{row.value}</TableCell>
              <TableCell
                className={`text-right ${
                  row.positive ? "text-green-300" : "text-red-300"
                }`}
              >
                {row.change}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.section>
  );
}
