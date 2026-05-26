import { Sidebar } from "@/components/sidebar/sidebar";
import { StatusBar } from "@/components/dashboard/status-bar";

interface DashboardShellProps {
  children: React.ReactNode;
  assistant: React.ReactNode;
}

export function DashboardShell({ children, assistant }: DashboardShellProps) {
  return (
    <div className="flex h-screen overflow-hidden text-white">
      <Sidebar />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1 overflow-y-auto p-4 pb-24 md:p-6 md:pb-28">
            {children}
          </main>

          <aside className="hidden h-full w-[380px] shrink-0 flex-col border-l border-white/10 bg-black/25 p-4 xl:flex">
            {assistant}
          </aside>
        </div>

        <StatusBar />
      </div>
    </div>
  );
}
