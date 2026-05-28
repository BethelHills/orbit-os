"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Send, Sparkles, Maximize2 } from "lucide-react";
import { useAccount } from "wagmi";
import { OrbitActionConfirmDialog } from "@/components/chat/orbit-action-confirm-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { detectWriteAction } from "@/lib/aomi/detect-write-action";
import type { ProtectedOrbitAction } from "@/lib/aomi/orbit-action-types";
import {
  useOrbitTransactionFlow,
  type TransactionFlowPhase,
} from "@/hooks/use-orbit-transaction-flow";
import { useCoin, useOrbitStore } from "@/store/orbit-store";
import type { AgentLogEntry } from "@/lib/zora/types";

type Message = {
  role: "user" | "agent";
  text: string;
};

const QUICK_ACTIONS = [
  "Launch coin",
  "Show holders",
  "Set price alert",
  "View analytics",
];

const QUICK_PROMPTS: Record<string, string> = {
  "Launch coin": "Launch a new coin called MOONJOY on Zora",
  "Show holders": "How many holders does my coin have?",
  "Set price alert": "Set a price alert at 0.5 ETH",
  "View analytics": "Show 24h volume and analytics",
};

const FLOW_STATUS: Partial<Record<TransactionFlowPhase, string>> = {
  preparing: "Simulating transaction...",
  simulating: "Simulating transaction...",
  wallet: "Waiting for wallet...",
  executing: "Monitoring...",
};

function ChatLoadingBubble({
  label,
  compact,
  mode,
}: {
  label: string;
  compact: boolean;
  mode: "skeleton" | "spinner";
}) {
  const shellClass = compact
    ? "mr-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3.5 py-3 text-xs"
    : "max-w-[90%] rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm sm:rounded-[28px] sm:px-7 sm:py-5";

  return (
    <div className={shellClass}>
      <div
        className={`mb-2 flex items-center gap-2 text-purple-300 ${
          compact ? "text-[10px]" : "mb-3"
        }`}
      >
        <Sparkles size={compact ? 12 : 16} />
        <span>Aomi</span>
      </div>

      {mode === "skeleton" ? (
        <div className="space-y-2">
          <Skeleton className={cn("h-3 bg-white/10", compact ? "w-full" : "h-3.5 w-full")} />
          <Skeleton className={cn("h-3 bg-white/10", compact ? "w-[88%]" : "h-3.5 w-[88%]")} />
          <Skeleton className={cn("h-3 bg-white/10", compact ? "w-[58%]" : "h-3.5 w-[58%]")} />
          <div className="flex items-center gap-2 pt-1 text-purple-300">
            <Loader2
              className={cn("animate-spin shrink-0", compact ? "size-3.5" : "size-4")}
            />
            <span className={compact ? "leading-relaxed" : "leading-relaxed sm:leading-8"}>
              {label}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2.5 text-purple-300">
          <Loader2
            className={cn("animate-spin shrink-0", compact ? "size-3.5" : "size-4")}
          />
          <span className={compact ? "leading-relaxed" : "leading-relaxed sm:leading-8"}>
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

function logForMessage(text: string, coinName?: string): AgentLogEntry {
  const lower = text.toLowerCase();
  const label = coinName ?? "MOONJOY";
  const base = {
    id: crypto.randomUUID(),
    status: "success" as const,
    timestamp: "Just now",
  };

  if (lower.includes("holder")) {
    return {
      ...base,
      kind: "holder",
      message: `Holder query completed for ${label} on Base`,
    };
  }
  if (lower.includes("alert")) {
    return {
      ...base,
      kind: "alert",
      message: `Price alert configured for ${label} on Base`,
    };
  }
  if (lower.includes("analytics") || lower.includes("volume")) {
    return {
      ...base,
      kind: "volume",
      message: `Analytics summary generated for ${label}`,
    };
  }
  return {
    ...base,
    kind: "message",
    message: `Aomi processed: "${text.slice(0, 48)}${text.length > 48 ? "…" : ""}"`,
  };
}

export function AomiChat({
  compact = false,
  className,
  promptRequest,
}: {
  compact?: boolean;
  className?: string;
  promptRequest?: { id: number; text: string } | null;
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [flowPhase, setFlowPhase] = useState<TransactionFlowPhase>("idle");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      text: "Welcome to OrbitOS. I can launch Zora coins, monitor holders, set alerts, and pull analytics on Base.\n\nWrite actions run through simulation, confirmation, and wallet signature before execution.",
    },
  ]);

  const { address } = useAccount();
  const coin = useCoin();
  const appendActivityLog = useOrbitStore((s) => s.appendActivityLog);
  const applyChatResponse = useOrbitStore((s) => s.applyChatResponse);
  const applyTransactionResult = useOrbitStore((s) => s.applyTransactionResult);

  const onAgentMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev, { role: "agent", text }]);
  }, []);

  const onUserMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
  }, []);

  const onTransactionComplete = useCallback(
    ({
      action,
      log,
      coin,
      txHash,
    }: {
      action: ProtectedOrbitAction;
      log: AgentLogEntry;
      coin: Parameters<typeof applyTransactionResult>[0]["coin"];
      txHash: string;
    }) => {
      applyTransactionResult({ action, log, coin, txHash });
    },
    [applyTransactionResult]
  );

  const {
    pendingAction,
    simulation,
    confirmOpen,
    busy: flowBusy,
    startWriteFlow,
    cancelFlow,
    approveFlow,
  } = useOrbitTransactionFlow({
    onAgentMessage,
    onUserMessage,
    onPhaseChange: setFlowPhase,
    onTransactionComplete,
  });

  async function sendMessage(messageText?: string) {
    const raw = messageText ?? input.trim();
    const text = QUICK_PROMPTS[raw] ?? raw;
    if (!text || loading || flowBusy) return;

    setInput("");

    const writeAction = detectWriteAction(text);
    if (writeAction) {
      await startWriteFlow(raw === text ? text : raw, writeAction);
      return;
    }

    const userMessage: Message = { role: "user", text: raw === text ? text : raw };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/aomi-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          coin,
          walletAddress: address,
        }),
      });

      if (!response.ok) throw new Error("Chat request failed");

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "agent", text: data.reply },
      ]);

      if (data.coin && data.logs && data.analytics) {
        applyChatResponse({
          coin: data.coin,
          logs: data.logs,
          analytics: data.analytics,
        });
      } else {
        appendActivityLog(logForMessage(text, coin.name));
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          text: "I could not complete that request right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!promptRequest?.text) return;
    void sendMessage(promptRequest.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire when sidebar prompt id changes
  }, [promptRequest?.id]);

  const flowStatus = FLOW_STATUS[flowPhase];
  const loadingLabel = loading
    ? "Aomi is analyzing..."
    : flowStatus ?? null;
  const loadingMode = loading ? "skeleton" : "spinner";
  const shellClass = cn(
    compact
      ? "glass-strong neon-border flex h-full min-h-0 flex-col rounded-2xl p-4"
      : "flex h-full min-h-0 flex-col rounded-2xl border border-purple-500/25 bg-[#070711]/80 p-4 shadow-[0_0_80px_rgba(126,34,206,0.18)] sm:rounded-[32px] sm:p-6",
    className
  );

  return (
    <>
      <aside className={shellClass}>
        <div className="flex shrink-0 items-start justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className={compact ? "size-4 text-purple-300" : "text-purple-300"} />
            <div>
              <h2
                className={
                  compact
                    ? "text-sm font-bold tracking-wide text-white"
                    : "font-serif text-lg font-bold text-white sm:text-2xl"
                }
              >
                AOMI ASSISTANT
              </h2>
              <p
                className={
                  compact
                    ? "text-[9px] uppercase tracking-wider text-purple-400/80"
                    : "mt-0.5 text-[10px] uppercase tracking-widest text-purple-300 sm:mt-1 sm:text-sm"
                }
              >
                Beta
              </p>
            </div>
          </div>
          <Maximize2 className="text-slate-500" size={compact ? 14 : 18} />
        </div>

        <div
          className={`min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 ${
            compact ? "mt-3" : "mt-4 space-y-4 pr-2 sm:mt-6 sm:space-y-5"
          }`}
        >
          {messages.slice(compact ? -4 : undefined).map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? compact
                    ? "ml-6 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-700 px-3.5 py-3 text-xs text-white"
                    : "ml-auto max-w-[85%] rounded-2xl bg-gradient-to-r from-purple-600 to-violet-700 px-4 py-3 text-sm text-white sm:rounded-[28px] sm:px-7 sm:py-5"
                  : compact
                    ? "mr-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3.5 py-3 text-xs text-slate-100"
                    : "max-w-[90%] rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 sm:rounded-[28px] sm:px-7 sm:py-5"
              }
            >
              {message.role === "agent" && (
                <div
                  className={`mb-2 flex items-center gap-2 text-purple-300 ${
                    compact ? "text-[10px]" : "mb-3"
                  }`}
                >
                  <Sparkles size={compact ? 12 : 16} />
                  <span>Aomi</span>
                </div>
              )}
              <p className={`whitespace-pre-line ${compact ? "leading-relaxed" : "leading-relaxed sm:leading-8"}`}>
                {message.text}
              </p>
            </div>
          ))}

          {loadingLabel && (
            <ChatLoadingBubble
              label={loadingLabel}
              compact={compact}
              mode={loadingMode}
            />
          )}
        </div>

        <div className={`grid shrink-0 grid-cols-2 gap-1.5 sm:grid-cols-4 ${compact ? "mt-2" : "mt-4 gap-2 sm:mt-6 sm:gap-3"}`}>
          {QUICK_ACTIONS.map((item) => (
            <button
              key={item}
              type="button"
              disabled={loading || flowBusy}
              onClick={() => sendMessage(item)}
              className={
                compact
                  ? "min-h-9 touch-manipulation rounded-lg border border-white/10 px-2 py-1.5 text-[10px] text-slate-400 transition hover:border-purple-500/30 hover:text-white active:scale-[0.99] disabled:opacity-50"
                  : "min-h-11 touch-manipulation rounded-xl border border-white/10 px-2 py-2 text-[11px] text-slate-300 transition hover:border-purple-500/40 hover:text-white active:scale-[0.99] disabled:opacity-50 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
              }
            >
              {item}
            </button>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
          className={`flex shrink-0 items-center gap-2 ${
            compact
              ? "mt-3 rounded-xl border border-purple-500/20 bg-black/40 px-3 py-2.5"
              : "mt-4 gap-2 rounded-xl border border-purple-500/30 bg-black/40 px-3 py-3 sm:mt-6 sm:gap-3 sm:rounded-[24px] sm:px-5 sm:py-4"
          }`}
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Aomi anything…"
            disabled={loading || flowBusy}
            className={`flex-1 bg-transparent text-base text-white outline-none placeholder:text-slate-500 disabled:opacity-50 ${
              compact ? "text-xs" : ""
            }`}
          />
          <button
            type="submit"
            disabled={loading || flowBusy || !input.trim()}
            className={
              compact
                ? "min-h-9 min-w-9 touch-manipulation rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-2 text-white disabled:opacity-50"
                : "min-h-11 min-w-11 touch-manipulation rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-3 text-white disabled:opacity-50"
            }
          >
            {loading || flowBusy ? (
              <Loader2 size={compact ? 14 : 18} className="animate-spin" />
            ) : (
              <Send size={compact ? 14 : 18} />
            )}
          </button>
        </form>
      </aside>

      <OrbitActionConfirmDialog
        open={confirmOpen}
        pendingAction={pendingAction}
        simulation={simulation}
        approving={flowBusy}
        onApprove={approveFlow}
        onCancel={cancelFlow}
      />
    </>
  );
}
