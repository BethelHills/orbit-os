"use client";

import { Sun } from "lucide-react";

import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { NotificationsBell } from "@/components/navigation/notifications-bell";
import { useLiveMetrics } from "@/hooks/use-live-metrics";
import { useMounted } from "@/hooks/use-mounted";
import { getTimeOfDayGreeting } from "@/lib/greeting";

export function DashboardHeader() {
  const mounted = useMounted();
  const live = useLiveMetrics();
  const greeting = mounted ? getTimeOfDayGreeting() : "Hello";

  const tracking = !live.mounted
    ? `Zora ${live.zora.coinName} · ${live.zora.volumeLabel} vol · ${live.aomi.successful} Aomi actions · connect wallet for Base txs.`
    : live.wallet.connected
      ? `Zora ${live.zora.coinName} · ${live.zora.holderCount.toLocaleString()} holders · ${live.aomi.successful} Aomi actions · ${live.wallet.addressShort} on Base.`
      : `Zora ${live.zora.coinName} · ${live.zora.volumeLabel} vol · ${live.aomi.successful} Aomi actions · connect wallet for Base txs.`;

  return (
    <header className="mb-4 flex flex-col gap-3 sm:mb-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <h1
          className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-[1.65rem]"
          suppressHydrationWarning
        >
          {greeting}, Bethel{" "}
          <span className="inline-block animate-[wave_2s_ease-in-out_infinite]">👋</span>
        </h1>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm" suppressHydrationWarning>
          {tracking}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <span className="glass hidden items-center gap-2 rounded-xl px-3 py-2 text-xs text-green-300 sm:flex">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
          Online
        </span>

        <NotificationsBell />

        <button
          type="button"
          className="glass hidden rounded-xl p-2.5 text-slate-300 transition hover:text-white sm:inline-flex"
        >
          <Sun size={16} />
        </button>

        <ConnectWalletButton />
      </div>
    </header>
  );
}
