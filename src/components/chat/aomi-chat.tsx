"use client";

import { useState } from "react";
import { Send, Sparkles, Maximize2 } from "lucide-react";
import { useOrbitStore } from "@/store/orbit-store";
import type { AgentLogEntry } from "@/lib/zora/types";

type Message = {
  role: "user" | "agent";
  text: string;
};

const QUICK_ACTIONS = ["Show holders", "Set price alert", "View analytics"];

const QUICK_PROMPTS: Record<string, string> = {
  "Show holders": "How many holders does my coin have?",
  "Set price alert": "Set a price alert at 0.5 ETH",
  "View analytics": "Show 24h volume and analytics",
};

export function AomiChat({ compact = false }: { compact?: boolean }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      text: "🚀 Coin 'MOONJOY' has been successfully launched on Zora!\n\n• Initial Price: 0.2 ETH\n• Network: Base\n• Contract: 0x7ora…0001\n• Status: Live & monitoring",
    },
  ]);

  const appendActivityLog = useOrbitStore((s) => s.appendActivityLog);

  function logForMessage(text: string): AgentLogEntry {
    const lower = text.toLowerCase();
    const base = {
      id: crypto.randomUUID(),
      status: "success" as const,
      timestamp: "Just now",
    };

    if (lower.includes("holder")) {
      return {
        ...base,
        kind: "holder",
        message: "Holder query completed — 42 active holders on MOONJOY",
      };
    }
    if (lower.includes("alert")) {
      return {
        ...base,
        kind: "alert",
        message: "Price alert configured for MOONJOY on Base",
      };
    }
    if (lower.includes("analytics") || lower.includes("volume")) {
      return {
        ...base,
        kind: "volume",
        message: "Analytics summary generated for MOONJOY",
      };
    }
    if (lower.includes("launch") || lower.includes("coin")) {
      return {
        ...base,
        kind: "launch",
        message: "Zora coin launch workflow prepared via Aomi",
      };
    }
    return {
      ...base,
      kind: "message",
      message: `Aomi processed: "${text.slice(0, 48)}${text.length > 48 ? "…" : ""}"`,
    };
  }

  async function sendMessage(messageText?: string) {
    const raw = messageText ?? input.trim();
    const text = QUICK_PROMPTS[raw] ?? raw;
    if (!text || loading) return;

    const userMessage: Message = { role: "user", text: raw === text ? text : raw };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/aomi-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) throw new Error("Chat request failed");

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "agent", text: data.reply },
      ]);

      appendActivityLog(logForMessage(text));
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

  const shellClass = compact
    ? "glass-strong neon-border flex h-full flex-col rounded-2xl p-4"
    : "rounded-[32px] border border-purple-500/25 bg-[#070711]/80 p-6 shadow-[0_0_80px_rgba(126,34,206,0.18)]";

  return (
    <aside className={shellClass}>
      <div className="flex shrink-0 items-start justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className={compact ? "size-4 text-purple-300" : "text-purple-300"} />
          <div>
            <h2
              className={
                compact
                  ? "text-sm font-bold tracking-wide text-white"
                  : "font-serif text-2xl font-bold text-white"
              }
            >
              AOMI ASSISTANT
            </h2>
            <p
              className={
                compact
                  ? "text-[9px] uppercase tracking-wider text-purple-400/80"
                  : "mt-1 text-sm uppercase tracking-widest text-purple-300"
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
          compact ? "mt-3" : "mt-8 max-h-[520px] space-y-5 pr-2"
        }`}
      >
        {messages.slice(compact ? -4 : undefined).map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? compact
                  ? "ml-6 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-700 px-3.5 py-3 text-xs text-white"
                  : "ml-auto max-w-[85%] rounded-[28px] bg-gradient-to-r from-purple-600 to-violet-700 px-7 py-5 text-white"
                : compact
                  ? "mr-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3.5 py-3 text-xs text-slate-100"
                  : "max-w-[90%] rounded-[28px] border border-slate-700 bg-slate-950/70 px-7 py-5 text-slate-100"
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
            <p className={`whitespace-pre-line ${compact ? "leading-relaxed" : "leading-8"}`}>
              {message.text}
            </p>
          </div>
        ))}

        {loading && (
          <div
            className={
              compact
                ? "rounded-2xl border border-white/10 bg-slate-950/70 px-3.5 py-3 text-xs text-purple-300"
                : "max-w-[90%] rounded-[28px] border border-slate-700 bg-slate-950/70 px-7 py-5 text-purple-300"
            }
          >
            Aomi is thinking…
          </div>
        )}
      </div>

      <div className={`grid shrink-0 grid-cols-3 gap-1.5 ${compact ? "mt-2" : "mt-8 gap-3"}`}>
        {QUICK_ACTIONS.map((item) => (
          <button
            key={item}
            type="button"
            disabled={loading}
            onClick={() => sendMessage(item)}
            className={
              compact
                ? "rounded-lg border border-white/10 px-2 py-1.5 text-[10px] text-slate-400 transition hover:border-purple-500/30 hover:text-white disabled:opacity-50"
                : "rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:border-purple-500/40 hover:text-white disabled:opacity-50"
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
            : "mt-6 gap-3 rounded-[24px] border border-purple-500/30 bg-black/40 px-5 py-4"
        }`}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask Aomi anything…"
          disabled={loading}
          className={`flex-1 bg-transparent text-white outline-none placeholder:text-slate-500 disabled:opacity-50 ${
            compact ? "text-xs" : ""
          }`}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={
            compact
              ? "rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-2 text-white disabled:opacity-50"
              : "rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-3 text-white disabled:opacity-50"
          }
        >
          <Send size={compact ? 14 : 18} />
        </button>
      </form>
    </aside>
  );
}
