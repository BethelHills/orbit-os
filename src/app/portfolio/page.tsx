import { portfolioAssets } from "@/lib/orbitos-data";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white p-4 md:p-6 lg:p-8">
      <section className="max-w-7xl mx-auto">
        <p className="text-sm text-purple-300 tracking-[0.25em] uppercase">
          OrbitOS
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mt-2">
          AI Portfolio Manager
        </h1>
        <p className="text-slate-400 mt-3 mb-8">
          Track creator coins, risk, holdings, and Aomi recommendations.
        </p>

        <div className="rounded-[28px] border border-purple-500/20 bg-white/[0.035] overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-4 text-sm text-slate-400 border-b border-white/10">
            <span>Asset</span>
            <span>Protocol</span>
            <span>Price</span>
            <span>24h</span>
            <span>Value</span>
          </div>

          {portfolioAssets.map((asset) => (
            <div
              key={asset.asset}
              className="grid grid-cols-5 gap-4 p-4 text-sm border-b border-white/5"
            >
              <span className="font-semibold">{asset.asset}</span>
              <span>{asset.protocol}</span>
              <span>{asset.price}</span>
              <span
                className={
                  asset.change.startsWith("-")
                    ? "text-red-400"
                    : "text-green-400"
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
