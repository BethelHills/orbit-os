"use client";

import { FormEvent, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useOrbitStore } from "@/store/orbit-store";

const QUICK_ACTIONS = ["Show holders", "Set alert", "Launch coin"];

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
      <div className="shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-purple-400" />
          <h2 className="text-base font-bold text-white">Aomi Assistant</h2>
        </div>
        {!compact && (
          <p className="mt-1 text-sm text-slate-400">
            Zora Creator Assistant on Base
          </p>
        )}
      </div>

      <div className="mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.slice(compact ? -4 : undefined).map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl px-3 py-2.5 text-xs leading-relaxed ${
              message.role === "user"
                ? "ml-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white"
                : "mr-1 border border-white/10 bg-slate-900/80 text-slate-200"
            }`}
          >
            {message.text}
          </motion.div>
        ))}
        {isLoading && (
          <p className="animate-pulse text-xs text-purple-300">
            Running Zora tools…
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-3 flex shrink-0 items-center gap-2 rounded-xl border border-purple-500/20 bg-black/40 px-3 py-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Command Aomi…"
          disabled={isLoading}
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-slate-600 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-1.5 disabled:opacity-50"
        >
          <Send size={14} />
        </button>
      </form>

      <div className="mt-2 grid shrink-0 grid-cols-3 gap-1.5">
        {QUICK_ACTIONS.map((item) => (
          <button
            key={item}
            type="button"
            disabled={isLoading}
            onClick={() => runQuickAction(item)}
            className="rounded-lg border border-white/10 px-2 py-1.5 text-[10px] text-slate-400 transition hover:border-purple-500/30 hover:text-white disabled:opacity-50"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
