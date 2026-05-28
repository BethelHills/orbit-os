import { AnalyticsChart } from "@/components/charts/analytics-chart";
import {
  StandalonePageHeader,
  StandalonePageShell,
} from "@/components/layout/standalone-page";
import { analyticsSignals } from "@/lib/orbitos-data";

export default function AnalyticsPage() {
  return (
    <StandalonePageShell>
      <StandalonePageHeader
        title="Intelligence Layer"
        subtitle="Real-time insights, growth signals, and agent-detected market patterns."
      />

      <AnalyticsChart />

      <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
        {analyticsSignals.map((signal) => (
          <article
            key={signal}
            className="min-w-0 rounded-2xl border border-purple-500/20 bg-white/[0.035] p-4 sm:p-5"
          >
            <p className="text-sm font-medium text-purple-300">AI Signal</p>
            <p className="mt-2 break-words text-sm leading-relaxed sm:text-base">
              {signal}
            </p>
          </article>
        ))}
      </div>
    </StandalonePageShell>
  );
}
