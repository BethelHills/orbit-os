import { Sidebar } from "@/components/sidebar/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProtocolCards } from "@/components/protocol-cards/protocol-cards";
import { OrbitGlobe } from "@/components/globe/orbit-globe";
import { AomiChat } from "@/components/chat/aomi-chat";
import { AnalyticsChart } from "@/components/charts/analytics-chart";
import { AgentLogs } from "@/components/dashboard/agent-logs";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050511] text-white">
      <div className="flex">
        <Sidebar />

        <section className="flex-1 p-6">
          <DashboardHeader />

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_390px] gap-6 mt-6">
            <div className="space-y-6">
              <ProtocolCards />

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                <OrbitGlobe />
                <AgentLogs />
              </div>

              <AnalyticsChart />
            </div>

            <AomiChat />
          </div>
        </section>
      </div>
    </main>
  );
}
