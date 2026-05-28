import type { PortfolioAssetRow } from "@/lib/orbitos-data";
import { cn } from "@/lib/utils";

export function PortfolioHoldings({ assets }: { assets: PortfolioAssetRow[] }) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {assets.map((asset) => (
          <article
            key={asset.asset}
            className="rounded-2xl border border-purple-500/20 bg-white/[0.035] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold">{asset.asset}</h2>
                <p className="mt-1 text-sm text-slate-400">{asset.protocol}</p>
              </div>
              <p className="shrink-0 text-base font-semibold">{asset.value}</p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-slate-500">Price</dt>
                <dd className="mt-0.5">{asset.price}</dd>
              </div>
              <div>
                <dt className="text-slate-500">24h</dt>
                <dd
                  className={cn(
                    "mt-0.5",
                    asset.change.startsWith("-") ? "text-red-400" : "text-green-400"
                  )}
                >
                  {asset.change}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-[28px] border border-purple-500/20 bg-white/[0.035] md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-slate-400">
                <th className="p-4 font-normal">Asset</th>
                <th className="p-4 font-normal">Protocol</th>
                <th className="p-4 font-normal">Price</th>
                <th className="p-4 font-normal">24h</th>
                <th className="p-4 font-normal">Value</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.asset} className="border-b border-white/5 last:border-0">
                  <td className="p-4 font-semibold">{asset.asset}</td>
                  <td className="p-4">{asset.protocol}</td>
                  <td className="p-4">{asset.price}</td>
                  <td
                    className={cn(
                      "p-4",
                      asset.change.startsWith("-") ? "text-red-400" : "text-green-400"
                    )}
                  >
                    {asset.change}
                  </td>
                  <td className="p-4">{asset.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
