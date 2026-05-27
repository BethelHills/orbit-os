"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardErrorFallbackProps extends FallbackProps {
  title?: string;
  compact?: boolean;
}

export function DashboardErrorFallback({
  error,
  resetErrorBoundary,
  title = "Dashboard section",
  compact = false,
}: DashboardErrorFallbackProps) {
  return (
    <div
      role="alert"
      className={cn(
        "glass-strong rounded-2xl border border-red-500/25 bg-red-950/15",
        compact ? "p-4" : "p-5 sm:p-6"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-300",
            compact ? "size-9" : "size-10"
          )}
        >
          <AlertTriangle className={compact ? "size-4" : "size-5"} />
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "font-semibold text-white",
              compact ? "text-sm" : "text-base"
            )}
          >
            {title} unavailable
          </p>
          <p
            className={cn(
              "mt-1 text-slate-400",
              compact ? "text-xs leading-relaxed" : "text-sm leading-relaxed"
            )}
          >
            This section hit an error. The rest of OrbitOS keeps running.
          </p>
          {process.env.NODE_ENV === "development" && (
            <p className="mt-2 truncate font-mono text-[10px] text-red-300/80">
              {error instanceof Error ? error.message : String(error)}
            </p>
          )}
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size={compact ? "sm" : "default"}
        onClick={resetErrorBoundary}
        className={cn(
          "mt-4 border-red-500/30 bg-transparent text-red-200 hover:bg-red-500/10 hover:text-white",
          compact && "h-8 text-xs"
        )}
      >
        <RotateCcw className={compact ? "size-3.5" : "size-4"} />
        Try again
      </Button>
    </div>
  );
}
