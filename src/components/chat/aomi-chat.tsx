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
    <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 h-fit">
      <div>
        <h2 className="text-xl font-bold">Aomi Chat</h2>
        <p className="text-sm text-slate-400 mt-1">
          Zora Creator Assistant — launch, monitor, and manage your coin.
        </p>
      </div>

      <div className="space-y-4 mt-6 max-h-[420px] overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded-2xl p-4 text-sm ${
              message.role === "user"
                ? "bg-purple-600 text-white ml-10"
                : "bg-slate-900 text-slate-200 mr-10 border border-white/10"
            }`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <p className="text-xs text-purple-300 mr-10">Aomi is running Zora tools…</p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
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

      <div className="grid grid-cols-2 gap-2 mt-4">
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
    </aside>
  );
}
