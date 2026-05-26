import {
  LayoutDashboard,
  MessageCircle,
  Layers,
  Activity,
  BarChart3,
  Bell,
  FileText,
  Settings,
} from "lucide-react";

const links = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Aomi Chat", icon: MessageCircle },
  { name: "Protocols", icon: Layers },
  { name: "Agent Actions", icon: Activity },
  { name: "Analytics", icon: BarChart3 },
  { name: "Alerts", icon: Bell },
  { name: "Docs", icon: FileText },
  { name: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-black/30 p-5 sticky top-0">
      <div className="mb-10">
        <div className="text-3xl font-bold tracking-tight">OrbitOS</div>
        <p className="text-sm text-purple-300 mt-1">
          Zora Creator Assistant · Base
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                index === 0
                  ? "bg-purple-600/30 text-white border border-purple-500/40"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4">
        <p className="text-sm text-purple-200">Early Forge</p>
        <h3 className="font-semibold mt-1">Build. Ship. Earn.</h3>
        <p className="text-xs text-slate-400 mt-2">
          Submit public GitHub, demo video, live app, and README.
        </p>
      </div>
    </aside>
  );
}
