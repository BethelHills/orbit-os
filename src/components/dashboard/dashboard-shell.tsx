import { Sidebar } from "@/components/sidebar/sidebar";
import { StatusBar } from "@/components/dashboard/status-bar";

interface DashboardShellProps {
  children: React.ReactNode;
  assistant: React.ReactNode;
}

export function DashboardShell({ children, assistant }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col text-white">
      <div className="flex flex-1 min-h-0">
        <Sidebar />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1">
            {/* Main dashboard */}
            <main className="min-w-0 flex-1 overflow-y-auto p-6">{children}</main>

            {/* Right assistant panel */}
            <aside className="hidden w-[400px] shrink-0 flex-col border-l border-white/10 bg-black/20 p-4 xl:flex">
              {assistant}
            </aside>
          </div>

          <StatusBar />
        </div>
      </div>
    </div>
  );
}
