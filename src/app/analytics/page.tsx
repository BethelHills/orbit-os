import { AnalyticsChart } from "@/components/charts/analytics-chart";
import { analyticsSignals } from "@/lib/orbitos-data";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white p-4 md:p-6 lg:p-8">
      <section className="max-w-7xl mx-auto">
        <p className="text-sm text-purple-300 tracking-[0.25em] uppercase">
          OrbitOS
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mt-2">
          Intelligence Layer
        </h1>
        <p className="text-slate-400 mt-3 mb-8">
          Real-time insights, growth signals, and agent-detected market patterns.
        </p>

        <AnalyticsChart />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {analyticsSignals.map((signal) => (
            <div
              key={signal}
              className="rounded-2xl border border-purple-500/20 bg-white/[0.035] p-5"
            >
              <p className="text-purple-300">AI Signal</p>
              <p className="mt-2">{signal}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
