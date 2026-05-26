import { AomiChat } from "@/components/chat/aomi-chat";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProtocolMatrix } from "@/components/dashboard/protocol-matrix";
import { OrbitGlobe } from "@/components/globe/orbit-globe";
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview";
import { AssetsTable } from "@/components/dashboard/assets-table";
import { AssistantPanel } from "@/components/dashboard/assistant-panel";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
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

        {/* Mobile / tablet: activity + chat below main */}
        <div className="space-y-4 xl:hidden">
          <div className="h-[420px]">
            <AomiChat />
          </div>
          <ActivityFeed />
        </div>
      </div>
    </DashboardShell>
  );
}
