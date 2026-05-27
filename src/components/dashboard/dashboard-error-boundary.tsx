"use client";

import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { DashboardErrorFallback } from "@/components/dashboard/dashboard-error-fallback";
import { captureOrbitError } from "@/lib/monitoring";

interface DashboardErrorBoundaryProps {
  children: ReactNode;
  name: string;
  compact?: boolean;
}

export function DashboardErrorBoundary({
  children,
  name,
  compact = false,
}: DashboardErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <DashboardErrorFallback {...props} title={name} compact={compact} />
      )}
      onError={(error, info) => {
        captureOrbitError(error, {
          section: name,
          componentStack: info.componentStack,
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
