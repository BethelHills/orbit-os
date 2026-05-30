"use client";

import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";
import {
  BalanceCards,
  PortfolioCtaBar,
  WalletSummaryCard,
} from "@/components/portfolio/portfolio-cards";
import { PortfolioHoldingsTable } from "@/components/portfolio/portfolio-holdings-table";
import { PortfolioSidePanels } from "@/components/portfolio/portfolio-side-panels";
import { usePortfolioSnapshot } from "@/hooks/use-portfolio-snapshot";

export function PortfolioWorkspace() {
  const { loading, snapshot } = usePortfolioSnapshot();
  const showEmptyHoldings =
    snapshot.source === "live" && snapshot.isConnected && snapshot.holdings.length === 0;

  return (
    <StandalonePageShell>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-purple-600/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-40 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <StandalonePageHeader
          title="Portfolio"
          subtitle="Track Base wallet balances, creator coin holdings, risk exposure, and Aomi recommendations — with live sync when your wallet is connected."
        />

        <PortfolioCtaBar className="mb-8 md:mb-10" />

        <div className="relative grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_min(100%,340px)] xl:gap-8">
          <div className="min-w-0 space-y-6">
            <WalletSummaryCard snapshot={snapshot} loading={loading} />
            <BalanceCards snapshot={snapshot} loading={loading} />

            <section className="min-w-0 space-y-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-orbit-accent">
                    Holdings
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">Token positions</h2>
                </div>
                {snapshot.source === "mock" && (
                  <p className="text-xs text-amber-300/90">
                    Showing mock creator coin positions
                  </p>
                )}
              </div>
              <PortfolioHoldingsTable
                holdings={snapshot.holdings}
                empty={showEmptyHoldings}
              />
            </section>
          </div>

          <PortfolioSidePanels snapshot={snapshot} />
        </div>
      </div>
    </StandalonePageShell>
  );
}
