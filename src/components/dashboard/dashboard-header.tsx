export function DashboardHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Good evening, Bethel 👋
        </h1>
        <p className="text-slate-400 mt-1">
          OrbitOS is your Aomi-powered AI operating system for on-chain actions.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm">
          Base Network
        </span>

        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
          Agent Active
        </span>

        <button className="rounded-full bg-purple-600 px-5 py-2 text-sm font-medium hover:bg-purple-500">
          Connect Wallet
        </button>
      </div>
    </header>
  );
}
