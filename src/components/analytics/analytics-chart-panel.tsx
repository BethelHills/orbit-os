"use client";

import type { ReactNode } from "react";

import { ClientChart } from "@/components/charts/client-chart";
import { cn } from "@/lib/utils";

type AnalyticsChartPanelProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeClassName?: string;
  children: ReactNode;
  className?: string;
  chartClassName?: string;
};

export function AnalyticsChartPanel({
  title,
  subtitle,
  badge,
  badgeClassName,
  children,
  className,
  chartClassName = "mt-4 h-52 min-h-[208px] w-full min-w-0 sm:mt-5 sm:h-64 sm:min-h-[256px]",
}: AnalyticsChartPanelProps) {
  return (
    <section
      className={cn(
        "relative min-w-0 overflow-hidden rounded-[28px] border border-orbit-border glass p-4 sm:p-5 lg:p-6",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-purple-500/10 blur-3xl"
      />
      <div className="relative flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.16em] text-orbit-accent">
            Analytics
          </p>
          <h2 className="mt-1 break-words text-lg font-semibold text-orbit-foreground sm:text-xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-orbit-muted">{subtitle}</p>
          ) : null}
        </div>
        {badge ? (
          <span
            className={cn(
              "w-fit shrink-0 rounded-full border px-2.5 py-1 text-xs",
              badgeClassName,
            )}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <ClientChart className={chartClassName}>{children}</ClientChart>
    </section>
  );
}
