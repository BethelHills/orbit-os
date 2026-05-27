"use client";

import type { ReactNode } from "react";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

interface ClientChartProps {
  children: ReactNode;
  className?: string;
}

/** Renders chart children only after mount to avoid Recharts SSR hydration mismatches. */
export function ClientChart({ children, className }: ClientChartProps) {
  const mounted = useMounted();

  return <div className={cn(className)}>{mounted ? children : null}</div>;
}
