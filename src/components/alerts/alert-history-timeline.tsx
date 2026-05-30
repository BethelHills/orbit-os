import type { AlertHistoryEvent } from "@/lib/alerts-data";
import { cn } from "@/lib/utils";

const SEVERITY_DOT: Record<AlertHistoryEvent["severity"], string> = {
  low: "bg-emerald-400",
  medium: "bg-amber-400",
  high: "bg-orange-400",
};

type AlertHistoryTimelineProps = {
  events: AlertHistoryEvent[];
};

export function AlertHistoryTimeline({ events }: AlertHistoryTimelineProps) {
  if (events.length === 0) {
    return (
      <p className="rounded-[24px] border border-dashed border-orbit-border px-4 py-8 text-center text-sm text-orbit-muted">
        No alert history yet.
      </p>
    );
  }

  return (
    <ol className="relative space-y-0">
      {events.map((event, index) => (
        <li key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
          {index < events.length - 1 ? (
            <span
              aria-hidden
              className="absolute left-[11px] top-6 h-[calc(100%-0.5rem)] w-px bg-orbit-border"
            />
          ) : null}
          <span
            className={cn(
              "relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full ring-4 ring-[#050510]",
              SEVERITY_DOT[event.severity],
            )}
          />
          <div className="min-w-0 flex-1 rounded-[20px] border border-orbit-border bg-orbit-surface-strong p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-orbit-foreground sm:text-base">
                {event.title}
              </h3>
              <span className="text-xs text-orbit-muted">{event.timestampLabel}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-orbit-muted">
              {event.description}
            </p>
            <p className="mt-3 text-xs capitalize text-orbit-accent/90">
              {event.status} · {event.severity} severity
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
