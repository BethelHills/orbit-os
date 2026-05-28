import { PortfolioHoldings } from "@/components/portfolio/portfolio-holdings";
import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";
import { portfolioAssets } from "@/lib/orbitos-data";

export default function PortfolioPage() {
  return (
    <StandalonePageShell>
      <StandalonePageHeader
        title="AI Portfolio Manager"
        subtitle="Track creator coins, risk, holdings, and Aomi recommendations."
      />
      <PortfolioHoldings assets={portfolioAssets} />
    </StandalonePageShell>
  );
}
