"use client";

import { AomiFramePanel } from "@/components/chat/aomi-frame-panel";
import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";

export function AgentChatWorkspace() {
  return (
    <StandalonePageShell>
      <StandalonePageHeader
        title="Agent Chat"
        subtitle="Full Aomi assistant shell with thread history, runtime controls, and wallet-backed transactions on Base."
      />

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_min(100%,320px)]">
        <div className="min-h-[min(70dvh,640px)] min-w-0 overflow-hidden rounded-[28px] border border-orbit-border bg-orbit-surface lg:min-h-[560px]">
          <AomiFramePanel className="h-full min-h-[min(70dvh,640px)] lg:min-h-[560px]" />
        </div>

        <aside className="min-w-0 space-y-4 sm:space-y-6">
          <SidebarPanel title="Agent Memory">
            <Memory title="Preferred Protocol" value="Zora" />
            <Memory title="Recent Action" value="Launch Coin" />
            <Memory title="Network" value="Base" />
          </SidebarPanel>

          <SidebarPanel title="Suggested Actions">
            <div className="mt-4 flex flex-col gap-3">
              {[
                "Launch coin",
                "Show holders",
                "Set price alert",
                "Show top buyers and holder activity",
              ].map((action) => (
                <div
                  key={action}
                  className="min-h-11 rounded-xl border border-white/10 p-4 text-left text-sm text-orbit-muted"
                >
                  {action}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-orbit-muted">
              Use the composer in the Aomi frame to send these prompts.
            </p>
          </SidebarPanel>

          <SidebarPanel title="Execution Timeline">
            <Timeline step="Protocol Selected" status="Zora" />
            <Timeline step="Simulation" status="Passed" />
            <Timeline step="Execution" status="Waiting" />
          </SidebarPanel>
        </aside>
      </div>
    </StandalonePageShell>
  );
}

function SidebarPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-orbit-border bg-orbit-surface p-5 sm:p-6">
      <p className="text-sm font-medium text-orbit-accent">{title}</p>
      <div className="mt-4 space-y-4 sm:mt-5">{children}</div>
    </div>
  );
}

function Memory({ title, value }: { title: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-sm text-orbit-muted">{title}</p>
      <p className="mt-1 break-words">{value}</p>
    </div>
  );
}

function Timeline({ step, status }: { step: string; status: string }) {
  return (
    <div className="min-w-0">
      <p className="break-words">{step}</p>
      <p className="text-sm text-green-400">{status}</p>
    </div>
  );
}
