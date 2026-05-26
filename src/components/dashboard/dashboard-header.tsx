"use client";

import { motion } from "framer-motion";
import { Bell, Sun, ChevronDown } from "lucide-react";

import { SSR_SAFE_INITIAL } from "@/lib/motion";

export function DashboardHeader() {
  return (
    <motion.header
      initial={SSR_SAFE_INITIAL}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 flex flex-col gap-3 sm:mb-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-[1.65rem]">
          Good evening, Bethel{" "}
          <span className="inline-block animate-[wave_2s_ease-in-out_infinite]">👋</span>
        </h1>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
          Your Aomi command center is live and operational.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          className="glass flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs text-white sm:gap-2 sm:px-3"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold">
            B
          </span>
          <span className="hidden sm:inline">Base</span>
          <ChevronDown size={12} className="text-slate-500" />
        </button>

        <span className="glass hidden items-center gap-2 rounded-xl px-3 py-2 text-xs text-green-300 sm:flex">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
          Online
        </span>

        <button
          type="button"
          className="glass relative hidden rounded-xl p-2.5 text-slate-300 transition hover:text-white sm:inline-flex"
        >
          <Bell size={16} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        <button
          type="button"
          className="glass hidden rounded-xl p-2.5 text-slate-300 transition hover:text-white sm:inline-flex"
        >
          <Sun size={16} />
        </button>

        <button
          type="button"
          className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-2 text-[11px] font-semibold shadow-[0_0_24px_rgba(139,92,246,0.45)] transition hover:brightness-110 sm:px-4 sm:py-2.5 sm:text-xs"
        >
          Connect
        </button>
      </div>
    </motion.header>
  );
}
