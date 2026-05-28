"use client";

import { useState } from "react";
import { AomiChat } from "@/components/chat/aomi-chat";
import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";

const SIDEBAR_PROMPTS: Record<string, string> = {
  "Launch Coin": "Launch coin",
  "Analyze Holders": "Show holders",
  "Set Alert": "Set price alert",
  "Monitor Buyers": "Show top buyers and holder activity",
};

export function AgentChatWorkspace() {
  const [prompt, setPrompt] = useState<{ id: number; text: string } | null>(null);

  function triggerPrompt(label: string) {
    const text = SIDEBAR_PROMPTS[label] ?? label;
    setPrompt({ id: Date.now(), text });
  }

  return (
    <StandalonePageShell>
      <StandalonePageHeader
        title="Agent Chat"
        subtitle="Talk to Aomi agents, simulate actions, review transactions and execute safely."
      />

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_min(100%,320px)]">
        <div className="min-h-[min(70dvh,640px)] min-w-0 lg:min-h-[560px]">
          <AomiChat className="h-full" promptRequest={prompt} />
        </div>

        <aside className="min-w-0 space-y-4 sm:space-y-6">
          <SidebarPanel title="Agent Memory">
            <Memory title="Preferred Protocol" value="Zora" />
            <Memory title="Recent Action" value="Launch Coin" />
            <Memory title="Network" value="Base" />
          </SidebarPanel>

          <SidebarPanel title="Suggested Actions">
            <div className="mt-4 flex flex-col gap-3">
              {Object.keys(SIDEBAR_PROMPTS).map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => triggerPrompt(action)}
                  className="min-h-11 touch-manipulation rounded-xl border border-white/10 p-4 text-left text-sm transition hover:border-purple-500 active:scale-[0.99] active:border-purple-500/70"
                >
                  {action}
                </button>
              ))}
            </div>
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
    <div className="rounded-[28px] border border-purple-500/20 bg-white/[0.03] p-5 sm:p-6">
      <p className="text-sm font-medium text-purple-300">{title}</p>
      <div className="mt-4 space-y-4 sm:mt-5">{children}</div>
    </div>
  );
}

function Memory({ title, value }: { title: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-sm text-slate-400">{title}</p>
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
