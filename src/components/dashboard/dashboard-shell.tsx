"use client";

import { useState, type ReactNode } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { MobileNav } from "@/components/dashboard/mobile-nav";
import { StatusBar } from "@/components/dashboard/status-bar";
import { Sidebar } from "@/components/sidebar/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: ReactNode;
  assistant: ReactNode;
}

export function DashboardShell({ children, assistant }: DashboardShellProps) {
  const mounted = useMounted();
  const isWide = useMediaQuery("(min-width: 1024px)");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const showResizableAssistant = mounted && isWide;

  return (
    <div className="flex h-[100dvh] overflow-hidden text-white">
      <Sidebar />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <MobileNav onOpenAssistant={() => setAssistantOpen(true)} />

        {showResizableAssistant ? (
          <Group
            id="orbit-dashboard"
            orientation="horizontal"
            className="flex min-h-0 flex-1"
          >
            <Panel
              id="main"
              defaultSize="72"
              minSize="45"
              className="min-w-0"
            >
              <main className="h-full overflow-y-auto p-3 pb-24 sm:p-4 md:p-6 md:pb-28">
                {children}
              </main>
            </Panel>

            <Separator className="group/separator relative w-1 shrink-0 bg-white/5 transition-colors hover:bg-purple-500/40 data-[separator='active']:bg-purple-500/50" />

            <Panel
              id="assistant"
              defaultSize="28"
              minSize="22"
              maxSize="42"
              className="min-w-0"
            >
              <aside className="flex h-full min-h-0 flex-col border-l border-white/10 bg-black/25 p-4">
                {assistant}
              </aside>
            </Panel>
          </Group>
        ) : (
          <main className="min-h-0 flex-1 overflow-y-auto p-3 pb-24 sm:p-4 md:p-6 md:pb-28">
            {children}
          </main>
        )}

        <StatusBar hasAssistantPanel={showResizableAssistant} />

        <Sheet open={assistantOpen} onOpenChange={setAssistantOpen}>
          <SheetContent
            side="right"
            className={cn(
              "flex w-[min(100vw,24rem)] flex-col border-l border-purple-500/10",
              "bg-[#0a0a14]/95 p-0 text-white backdrop-blur-xl sm:max-w-md"
            )}
          >
            <SheetTitle className="sr-only">Aomi Assistant</SheetTitle>
            <div className="flex h-full min-h-0 flex-col p-4">{assistant}</div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
