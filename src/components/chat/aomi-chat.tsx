import { Send } from "lucide-react";

const messages = [
  {
    role: "user",
    text: 'Launch a new Zora creator coin called "MOONJOY" with initial price 0.2 ETH.',
  },
  {
    role: "agent",
    text: "Coin launch prepared. Aomi selected Zora, simulated the action, and generated a launch workflow.",
  },
];

export function AomiChat() {
  return (
    <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 h-fit">
      <div>
        <h2 className="text-xl font-bold">Aomi Chat</h2>
        <p className="text-sm text-slate-400 mt-1">
          Command your on-chain agent in plain English.
        </p>
      </div>

      <div className="space-y-4 mt-6">
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
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
        <input
          placeholder="Ask OrbitOS anything..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
        />
        <button className="rounded-full bg-purple-600 p-2">
          <Send size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {["Show holders", "Set alert", "View analytics", "Launch coin"].map(
          (item) => (
            <button
              key={item}
              className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5"
            >
              {item}
            </button>
          )
        )}
      </div>
    </aside>
  );
}
