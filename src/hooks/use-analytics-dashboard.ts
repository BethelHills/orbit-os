"use client";

import { useMemo } from "react";

import { getAnalyticsDashboardData, type AnalyticsDashboardData } from "@/lib/analytics-data";

/**
 * Hook boundary for analytics dashboard data.
 * Swap implementation to fetch from Aomi/Zora APIs without changing UI components.
 */
export function useAnalyticsDashboard(): AnalyticsDashboardData {
  return useMemo(() => getAnalyticsDashboardData(), []);
}
