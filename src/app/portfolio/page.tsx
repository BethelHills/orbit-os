import { portfolioAssets } from "@/lib/orbitos-data";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#050510] p-4 text-white md:p-6 lg:p-8">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.25em] text-purple-300">OrbitOS</p>
        <h1 className="mt-2 text-3xl font-bold md:text-5xl">AI Portfolio Manager</h1>
        <p className="mb-8 mt-3 text-slate-400">
          Track creator coins, risk, holdings, and Aomi recommendations.
        </p>

        <div className="overflow-hidden rounded-[28px] border border-purple-500/20 bg-white/[0.035]">
          <div className="grid grid-cols-5 gap-4 border-b border-white/10 p-4 text-sm text-slate-400">
            <span>Asset</span>
            <span>Protocol</span>
            <span>Price</span>
            <span>24h</span>
            <span>Value</span>
          </div>

          {portfolioAssets.map((asset) => (
            <div
              key={asset.asset}
              className="grid grid-cols-5 gap-4 border-b border-white/5 p-4 text-sm"
            >
              <span className="font-semibold">{asset.asset}</span>
              <span>{asset.protocol}</span>
              <span>{asset.price}</span>
              <span
                className={
                  asset.change.startsWith("-") ? "text-red-400" : "text-green-400"
                }
              >
                {asset.change}
              </span>
              <span>{asset.value}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
