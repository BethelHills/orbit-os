"use client";

import { useMemo } from "react";

import {
  getAlertsWatchtowerData,
  type AlertsWatchtowerData,
} from "@/lib/alerts-data";

/** Swap implementation for live Aomi/Zora alert feeds without changing UI. */
export function useAlertsWatchtower(): AlertsWatchtowerData {
  return useMemo(() => getAlertsWatchtowerData(), []);
}
