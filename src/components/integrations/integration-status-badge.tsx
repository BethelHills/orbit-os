import {
  INTEGRATION_STATUS_LABELS,
  type IntegrationStatus,
} from "@/lib/integrations-data";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<IntegrationStatus, string> = {
  installed: "border-emerald-500/35 bg-emerald-500/10 text-emerald-300",
  active: "border-purple-500/35 bg-purple-500/10 text-purple-200",
  optional: "border-white/15 bg-white/[0.04] text-orbit-muted",
  pending: "border-amber-500/35 bg-amber-500/10 text-amber-300",
};

type IntegrationStatusBadgeProps = {
  status: IntegrationStatus;
  className?: string;
};

export function IntegrationStatusBadge({
  status,
  className,
}: IntegrationStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        STATUS_STYLES[status],
        className,
      )}
    >
      {INTEGRATION_STATUS_LABELS[status]}
    </span>
  );
}
