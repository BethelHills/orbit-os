import { AomiChat } from "@/components/chat/aomi-chat";
import { PageBackButton } from "@/components/navigation/page-back-button";

export default function AgentChatPage() {
  return (
    <main className="min-h-screen bg-[#050510] p-4 text-white md:p-8">
      <PageBackButton />
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-300">OrbitOS</p>
          <h1 className="mt-3 text-4xl font-bold">Agent Chat</h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            Talk to Aomi agents, simulate actions, review transactions and execute safely.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <AomiChat />

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-purple-500/20 bg-white/[0.03] p-6">
              <p className="text-purple-300">Agent Memory</p>
              <div className="mt-5 space-y-4">
                <Memory title="Preferred Protocol" value="Zora" />
                <Memory title="Recent Action" value="Launch Coin" />
                <Memory title="Network" value="Base" />
              </div>
            </div>

            <div className="rounded-[28px] border border-purple-500/20 bg-white/[0.03] p-6">
              <p className="text-purple-300">Suggested Actions</p>
              <div className="mt-4 flex flex-col gap-3">
                {["Launch Coin", "Analyze Holders", "Set Alert", "Monitor Buyers"].map(
                  (action) => (
                    <button
                      key={action}
                      type="button"
                      className="rounded-xl border border-white/10 p-4 text-left hover:border-purple-500"
                    >
                      {action}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-purple-500/20 bg-white/[0.03] p-6">
              <p className="text-purple-300">Execution Timeline</p>
              <div className="mt-5 space-y-4">
                <Timeline step="Protocol Selected" status="Zora" />
                <Timeline step="Simulation" status="Passed" />
                <Timeline step="Execution" status="Waiting" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Memory({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}

function Timeline({ step, status }: { step: string; status: string }) {
  return (
    <div>
      <p>{step}</p>
      <p className="text-sm text-green-400">{status}</p>
    </div>
  );
}
