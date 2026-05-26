"use client";

import { useOrbitStore } from "@/store/orbit-store";

export function StatusBar() {
  const coin = useOrbitStore((s) => s.coin);
  const isLoading = useOrbitStore((s) => s.isLoading);
  const lastLog = useOrbitStore((s) => s.logs[s.logs.length - 1]);

  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 lg:pl-[calc(18rem+1rem)] xl:pr-[calc(380px+1rem)]">
      <div className="glass-strong pointer-events-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-3 text-xs text-slate-400 neon-border">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2 font-medium text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
            Base
          </span>
          <span className="flex items-center gap-2 text-green-300">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
            {isLoading ? "Executing…" : "Aomi Active"}
          </span>
          <span className="hidden text-purple-300 sm:inline">Zora Creator Assistant</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {coin.name && (
            <>
              <span>
                <span className="text-slate-500">Asset </span>
                <span className="font-medium text-white">{coin.symbol}</span>
              </span>
              <span>
                <span className="text-slate-500">Holders </span>
                <span className="text-cyan-300">{coin.holderCount}</span>
              </span>
              <span className="hidden md:inline">
                <span className="text-slate-500">Vol </span>
                <span className="text-white">{coin.volume24hEth} ETH</span>
              </span>
            </>
          )}
          {lastLog && (
            <span className="max-w-[200px] truncate text-purple-300/90 lg:max-w-xs">
              {lastLog.message}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
