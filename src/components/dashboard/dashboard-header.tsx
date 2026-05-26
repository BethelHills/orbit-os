"use client";

import { motion } from "framer-motion";

export function DashboardHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-purple-400/80">
          Command Center
        </p>
        <h1 className="neon-text mt-1 text-2xl font-bold tracking-tight md:text-3xl">
          Good evening, Bethel
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Aomi-powered Zora Creator Assistant on Base
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="glass rounded-full px-3 py-1.5 text-xs text-blue-300">
          Base Network
        </span>
        <span className="glass rounded-full px-3 py-1.5 text-xs text-green-300">
          Agent Active
        </span>
        <button className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-1.5 text-xs font-medium shadow-[0_0_20px_rgba(139,92,246,0.4)] transition hover:brightness-110">
          Connect Wallet
        </button>
      </div>
    </motion.header>
  );
}
