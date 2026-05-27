"use client";

import { motion } from "framer-motion";
import { Bell, Sun } from "lucide-react";

import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { useLiveMetrics } from "@/hooks/use-live-metrics";
import { SSR_SAFE_INITIAL } from "@/lib/motion";

export function DashboardHeader() {
  const live = useLiveMetrics();

  const tracking = live.wallet.connected
    ? `Zora ${live.zora.coinName} · ${live.zora.holderCount.toLocaleString()} holders · ${live.aomi.successful} Aomi actions · ${live.wallet.addressShort} on Base.`
    : `Zora ${live.zora.coinName} · ${live.zora.volumeLabel} vol · ${live.aomi.successful} Aomi actions · connect wallet for Base txs.`;

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
        <p suppressHydrationWarning className="mt-1 text-xs text-slate-400 sm:text-sm">
          {tracking}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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

        <ConnectWalletButton />
      </div>
    </motion.header>
  );
}
