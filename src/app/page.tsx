import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProtocolMatrix } from "@/components/dashboard/protocol-matrix";
import { OrbitGlobe } from "@/components/globe/orbit-globe";
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview";
import { AssetsTable } from "@/components/dashboard/assets-table";
import { AssistantPanel } from "@/components/dashboard/assistant-panel";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function Home() {
  return (
    <DashboardShell
      assistant={<AssistantPanel />}
    >
      <DashboardHeader />

      <div className="space-y-6">
        <ProtocolMatrix />

        <OrbitGlobe />

        <PortfolioOverview />

        <AssetsTable />
      </div>
    </DashboardShell>
  );
}
