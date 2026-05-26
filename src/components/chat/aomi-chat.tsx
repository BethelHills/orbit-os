"use client";

import { FormEvent, useState } from "react";
import { Maximize2, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { SSR_SAFE_INITIAL } from "@/lib/motion";
import { useOrbitStore } from "@/store/orbit-store";

const QUICK_ACTIONS = ["Show holders", "Set price alert", "View analytics"];

export function AomiChat({ compact = false }: { compact?: boolean }) {
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage, runQuickAction } = useOrbitStore();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input;
    setInput("");
    await sendMessage(text);
  }

  return (
    <div
      className={`glass-strong flex flex-col rounded-2xl neon-border ${
        compact ? "h-full p-4" : "h-full min-h-[480px] p-5"
      }`}
    >
      <div className="flex shrink-0 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-purple-400" />
          <div>
            <h2 className="text-sm font-bold tracking-wide text-white">
              AOMI ASSISTANT
            </h2>
            <span className="text-[9px] uppercase tracking-wider text-purple-400/80">
              Beta
            </span>
          </div>
        </div>
        <button className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-white">
          <Maximize2 size={14} />
        </button>
      </div>

      <div className="mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.slice(compact ? -3 : undefined).map((message, index) => (
          <motion.div
            key={index}
            initial={SSR_SAFE_INITIAL}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl px-3.5 py-3 text-xs leading-relaxed ${
              message.role === "user"
                ? "ml-6 bg-gradient-to-r from-purple-600/90 to-violet-700/90 text-white"
                : "mr-2 border border-white/10 bg-slate-900/70 text-slate-200"
            }`}
          >
            {message.role === "agent" && (
              <div className="mb-2 flex items-center gap-1.5">
                <Sparkles size={12} className="text-purple-400" />
                <span className="text-[10px] font-medium text-purple-300">Aomi</span>
              </div>
            )}
            <div className="whitespace-pre-wrap">{message.text}</div>
          </motion.div>
        ))}
        {isLoading && (
          <p className="animate-pulse text-xs text-purple-300">
            Running Zora tools…
          </p>
        )}
      </div>

      {!isLoading && messages.length > 0 && (
        <div className="mt-2 grid shrink-0 grid-cols-3 gap-1.5">
          {QUICK_ACTIONS.map((item) => (
            <button
              key={item}
              type="button"
              disabled={isLoading}
              onClick={() => runQuickAction(item)}
              className="rounded-lg border border-white/10 bg-black/30 px-2 py-1.5 text-[10px] text-slate-400 transition hover:border-purple-500/30 hover:text-white disabled:opacity-50"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-3 flex shrink-0 items-center gap-2 rounded-xl border border-purple-500/20 bg-black/40 px-3 py-2.5"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Aomi anything…"
          disabled={isLoading}
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-slate-600 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-2 disabled:opacity-50"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
