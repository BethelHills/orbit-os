"use client";

import { useState, type ReactNode } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { MobileNav } from "@/components/dashboard/mobile-nav";
import { DashboardErrorBoundary } from "@/components/dashboard/dashboard-error-boundary";
import { StatusBar } from "@/components/dashboard/status-bar";
import { Sidebar } from "@/components/sidebar/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { useViewportTier } from "@/hooks/use-viewport-tier";
import { cn } from "@/lib/utils";

import { MobileSidebarProvider } from "@/components/navigation/mobile-sidebar-context";

interface DashboardShellProps {
  children: ReactNode;
  assistant: ReactNode;
}

function MainAssistantPanels({
  children,
  assistant,
  tier,
}: {
  children: ReactNode;
  assistant: ReactNode;
  tier: "tablet" | "desktop";
}) {
  const isDesktop = tier === "desktop";

  return (
    <Group
      id="orbit-dashboard"
      orientation="horizontal"
      className="flex min-h-0 flex-1"
    >
      <Panel
        id="main"
        defaultSize={isDesktop ? "72" : "62"}
        minSize="40"
        className="min-w-0"
      >
        <main className="h-full overflow-y-auto p-3 pb-24 sm:p-4 md:p-5 md:pb-28 lg:p-6">
          <DashboardErrorBoundary name="Dashboard main">
            {children}
          </DashboardErrorBoundary>
        </main>
      </Panel>

      <Separator className="relative w-1 shrink-0 bg-white/5 transition-colors hover:bg-purple-500/40 data-[separator='active']:bg-purple-500/50" />

      <Panel
        id="assistant"
        defaultSize={isDesktop ? "28" : "38"}
        minSize={isDesktop ? "22" : "28"}
        maxSize={isDesktop ? "42" : "48"}
        className="min-w-0"
      >
        <aside className="flex h-full min-h-0 flex-col border-l border-white/10 bg-black/25 p-3 md:p-4">
          <DashboardErrorBoundary name="Aomi assistant" compact>
            {assistant}
          </DashboardErrorBoundary>
        </aside>
      </Panel>
    </Group>
  );
}

export function DashboardShell({ children, assistant }: DashboardShellProps) {
  const tier = useViewportTier();
  const [assistantOpen, setAssistantOpen] = useState(false);

  const showPanels = tier === "tablet" || tier === "desktop";
  const showMobileNav = tier === "mobile";

  return (
    <MobileSidebarProvider>
      <div className="flex h-[100dvh] overflow-hidden text-orbit-foreground">
        <Sidebar />

        <div className="relative flex min-w-0 flex-1 flex-col">
          {showMobileNav && (
            <MobileNav onOpenAssistant={() => setAssistantOpen(true)} />
          )}

          {showPanels ? (
            <MainAssistantPanels
              tier={tier === "desktop" ? "desktop" : "tablet"}
              assistant={assistant}
            >
              {children}
            </MainAssistantPanels>
          ) : (
            <main className="min-h-0 flex-1 overflow-y-auto p-3 pb-24 sm:p-4 md:p-6 md:pb-28">
              <DashboardErrorBoundary name="Dashboard main">
                {children}
              </DashboardErrorBoundary>
            </main>
          )}

          <StatusBar tier={tier} hasAssistantPanel={showPanels} />

          {showMobileNav && (
            <Sheet open={assistantOpen} onOpenChange={setAssistantOpen}>
              <SheetContent
                side="right"
                className={cn(
                  "flex w-[min(100vw,24rem)] flex-col border-l border-purple-500/10",
                  "bg-orbit-shell/95 p-0 text-orbit-foreground backdrop-blur-xl sm:max-w-md"
                )}
              >
                <SheetTitle className="sr-only">Aomi Assistant</SheetTitle>
                <div className="flex h-full min-h-0 flex-col p-4">
                  <DashboardErrorBoundary name="Aomi assistant" compact>
                    {assistant}
                  </DashboardErrorBoundary>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </MobileSidebarProvider>
  );
}
