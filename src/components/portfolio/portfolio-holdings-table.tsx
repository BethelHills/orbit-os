import type { PortfolioHoldingRow } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type PortfolioHoldingsTableProps = {
  holdings: PortfolioHoldingRow[];
  empty?: boolean;
};

export function PortfolioHoldingsTable({
  holdings,
  empty,
}: PortfolioHoldingsTableProps) {
  if (empty || holdings.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-orbit-border bg-orbit-surface/60 px-5 py-12 text-center sm:px-8">
        <p className="text-base font-medium text-orbit-foreground">
          No token holdings yet
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-orbit-muted">
          Your wallet has no tracked creator coins or protocol tokens. Fund Base
          ETH/USDC or launch a Zora coin to populate this table.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {holdings.map((row) => (
          <article
            key={row.id}
            className="rounded-2xl border border-orbit-border bg-orbit-surface-strong p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold">{row.symbol}</h3>
                <p className="mt-1 text-sm text-orbit-muted">{row.protocol}</p>
              </div>
              <p className="shrink-0 text-base font-semibold">{row.valueLabel}</p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-orbit-muted">Price</dt>
                <dd className="mt-0.5">{row.priceLabel}</dd>
              </div>
              <div>
                <dt className="text-orbit-muted">24h</dt>
                <dd
                  className={cn(
                    "mt-0.5",
                    row.changePositive ? "text-green-400" : "text-red-400",
                  )}
                >
                  {row.changeLabel}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-[28px] border border-orbit-border bg-orbit-surface-strong md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-orbit-subtle text-left text-orbit-muted">
                <th className="p-4 font-normal">Token</th>
                <th className="p-4 font-normal">Protocol</th>
                <th className="p-4 font-normal">Balance</th>
                <th className="p-4 font-normal">Price</th>
                <th className="p-4 font-normal">24h</th>
                <th className="p-4 font-normal">Value</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-orbit-subtle last:border-0"
                >
                  <td className="p-4">
                    <div className="font-semibold">{row.symbol}</div>
                    <div className="text-xs text-orbit-muted">{row.name}</div>
                  </td>
                  <td className="p-4">{row.protocol}</td>
                  <td className="p-4">{row.balance}</td>
                  <td className="p-4">{row.priceLabel}</td>
                  <td
                    className={cn(
                      "p-4",
                      row.changePositive ? "text-green-400" : "text-red-400",
                    )}
                  >
                    {row.changeLabel}
                  </td>
                  <td className="p-4 font-medium">{row.valueLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
