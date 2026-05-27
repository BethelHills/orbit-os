import { AssistantPanel } from "@/components/dashboard/assistant-panel";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardShell assistant={<AssistantPanel />}>{children}</DashboardShell>
  );
}
