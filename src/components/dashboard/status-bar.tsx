"use client";

import { useOrbitStore } from "@/store/orbit-store";

export function StatusBar() {
  const coin = useOrbitStore((s) => s.coin);
  const isLoading = useOrbitStore((s) => s.isLoading);
  const lastLog = useOrbitStore((s) => s.logs[s.logs.length - 1]);

  return (
    <footer className="shrink-0 border-t border-white/10 bg-black/40 px-6 py-3 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            Base Network
          </span>
          <span className="flex items-center gap-2 text-green-300">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            {isLoading ? "Agent running…" : "Agent Active"}
          </span>
          <span>Zora · Creator Assistant</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {coin.name && (
            <>
              <span>
                Coin: <span className="text-white">{coin.symbol}</span>
              </span>
              <span>
                Holders: <span className="text-green-300">{coin.holderCount}</span>
              </span>
              <span>
                24h: <span className="text-white">{coin.volume24hEth} ETH</span>
              </span>
            </>
          )}
          {lastLog && (
            <span className="max-w-md truncate text-purple-300/80">
              {lastLog.message}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
