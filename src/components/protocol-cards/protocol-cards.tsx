const protocols = [
  {
    name: "Zora",
    persona: "Creator launching coins",
    action: "Launch coin, monitor holders, track buyers",
    status: "Recommended",
  },
  {
    name: "Aerodrome",
    persona: "Liquidity provider",
    action: "Track pools, rewards, and rebalancing",
    status: "Ready",
  },
  {
    name: "Avantis",
    persona: "Perp trader",
    action: "Monitor risk and position health",
    status: "Ready",
  },
  {
    name: "Monad",
    persona: "Early ecosystem builder",
    action: "Test agent flow on new EVM chain",
    status: "Bonus",
  },
];

export function ProtocolCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {protocols.map((protocol) => (
        <div
          key={protocol.name}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{protocol.name}</h3>
            <span className="text-xs rounded-full bg-purple-500/20 text-purple-200 px-3 py-1">
              {protocol.status}
            </span>
          </div>

          <p className="text-sm text-slate-400 mt-3">{protocol.persona}</p>
          <p className="text-sm text-slate-300 mt-4">{protocol.action}</p>
        </div>
      ))}
    </section>
  );
}
