import { Sidebar } from "@/components/sidebar/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProtocolCards } from "@/components/protocol-cards/protocol-cards";
import { OrbitGlobe } from "@/components/globe/orbit-globe";
import { AomiChat } from "@/components/chat/aomi-chat";
import { AnalyticsChart } from "@/components/charts/analytics-chart";
import { AgentLogs } from "@/components/dashboard/agent-logs";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function Home() {
  return (
    <DashboardShell assistant={<AomiChat />}>
      <DashboardHeader />

      <div className="mt-6 space-y-6">
        <ProtocolCards />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          <OrbitGlobe />
          <AgentLogs />
        </div>

        <AnalyticsChart />
      </div>
    </DashboardShell>
  );
}
