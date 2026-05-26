"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { useOrbitStore } from "@/store/orbit-store";

const QUICK_ACTIONS = [
  "Show holders",
  "Set alert",
  "View analytics",
  "Launch coin",
];

export function AomiChat() {
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage, runQuickAction } = useOrbitStore();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input;
    setInput("");
    await sendMessage(text);
  }

  return (
    <div className="glass flex h-full min-h-0 flex-col rounded-3xl p-5">
      <div className="shrink-0">
        <h2 className="text-xl font-bold">Aomi Assistant</h2>
        <p className="mt-1 text-sm text-slate-400">
          Zora Creator Assistant — launch, monitor, and manage your coin.
        </p>
      </div>

      <div className="mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded-2xl p-4 text-sm ${
              message.role === "user"
                ? "ml-6 bg-purple-600 text-white"
                : "mr-2 border border-white/10 bg-slate-900 text-slate-200"
            }`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <p className="text-xs text-purple-300">Aomi is running Zora tools…</p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex shrink-0 items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask OrbitOS anything..."
          disabled={isLoading}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-full bg-purple-600 p-2 disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </form>

      <div className="mt-3 grid shrink-0 grid-cols-2 gap-2">
        {QUICK_ACTIONS.map((item) => (
          <button
            key={item}
            type="button"
            disabled={isLoading}
            onClick={() => runQuickAction(item)}
            className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 disabled:opacity-50"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
