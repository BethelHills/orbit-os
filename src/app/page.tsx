import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardErrorBoundary } from "@/components/dashboard/dashboard-error-boundary";
import { ProtocolMatrix } from "@/components/dashboard/protocol-matrix";
import { OrbitGlobe } from "@/components/globe/orbit-globe";
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview";
import { AssetsTable } from "@/components/dashboard/assets-table";
import { AssistantPanel } from "@/components/dashboard/assistant-panel";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function Home() {
  return (
    <DashboardShell assistant={<AssistantPanel />}>
      <DashboardErrorBoundary name="Dashboard header">
        <DashboardHeader />
      </DashboardErrorBoundary>

      <div className="space-y-6">
        <DashboardErrorBoundary name="Protocol matrix">
          <ProtocolMatrix />
        </DashboardErrorBoundary>

        <DashboardErrorBoundary name="Network globe">
          <OrbitGlobe />
        </DashboardErrorBoundary>

        <DashboardErrorBoundary name="Portfolio overview">
          <PortfolioOverview />
        </DashboardErrorBoundary>

        <DashboardErrorBoundary name="Assets table">
          <AssetsTable />
        </DashboardErrorBoundary>
      </div>
    </DashboardShell>
  );
}
