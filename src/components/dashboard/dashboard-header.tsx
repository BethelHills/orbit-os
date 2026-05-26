"use client";

import { motion } from "framer-motion";
import { Bell, Sun, ChevronDown } from "lucide-react";

export function DashboardHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-[1.65rem]">
          Good evening, Bethel{" "}
          <span className="inline-block animate-[wave_2s_ease-in-out_infinite]">👋</span>
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Your Aomi command center is live and operational.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold">
            B
          </span>
          Base
          <ChevronDown size={12} className="text-slate-500" />
        </button>

        <span className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-green-300">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
          Online
        </span>

        <button className="glass relative rounded-xl p-2.5 text-slate-300 transition hover:text-white">
          <Bell size={16} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        <button className="glass rounded-xl p-2.5 text-slate-300 transition hover:text-white">
          <Sun size={16} />
        </button>

        <button className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2.5 text-xs font-semibold shadow-[0_0_24px_rgba(139,92,246,0.45)] transition hover:brightness-110">
          Connect Wallet
        </button>
      </div>
    </motion.header>
  );
}
