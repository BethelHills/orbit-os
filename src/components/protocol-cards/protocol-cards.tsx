"use client";

import { useOrbitStore } from "@/store/orbit-store";

const protocols = [
  {
    name: "Zora",
    persona: "Creator launching coins",
    action: "Launch coin, monitor holders, track buyers",
    status: "Active",
    primary: true,
  },
  {
    name: "Aerodrome",
    persona: "Liquidity provider",
    action: "Track pools, rewards, and rebalancing",
    status: "Ready",
    primary: false,
  },
  {
    name: "Avantis",
    persona: "Perp trader",
    action: "Monitor risk and position health",
    status: "Ready",
    primary: false,
  },
  {
    name: "Monad",
    persona: "Early ecosystem builder",
    action: "Test agent flow on new EVM chain",
    status: "Bonus",
    primary: false,
  },
];

export function ProtocolCards() {
  const coin = useOrbitStore((s) => s.coin);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {protocols.map((protocol) => (
        <div
          key={protocol.name}
          className={`rounded-3xl border p-5 shadow-2xl ${
            protocol.primary
              ? "border-purple-500/40 bg-purple-500/10"
              : "border-white/10 bg-white/[0.03]"
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{protocol.name}</h3>
            <span className="text-xs rounded-full bg-purple-500/20 text-purple-200 px-3 py-1">
              {protocol.primary && coin.name ? coin.status : protocol.status}
            </span>
          </div>

          <p className="text-sm text-slate-400 mt-3">{protocol.persona}</p>
          <p className="text-sm text-slate-300 mt-4">{protocol.action}</p>

          {protocol.primary && coin.name && (
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-black/30 p-2">
                <p className="text-slate-500">Coin</p>
                <p className="text-white font-medium">{coin.symbol}</p>
              </div>
              <div className="rounded-xl bg-black/30 p-2">
                <p className="text-slate-500">Holders</p>
                <p className="text-green-300 font-medium">{coin.holderCount}</p>
              </div>
              <div className="rounded-xl bg-black/30 p-2">
                <p className="text-slate-500">24h vol</p>
                <p className="text-white font-medium">{coin.volume24hEth} ETH</p>
              </div>
              <div className="rounded-xl bg-black/30 p-2">
                <p className="text-slate-500">Price</p>
                <p className="text-white font-medium">{coin.initialPriceEth ?? "—"} ETH</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
