"use client";

import { useMemo } from "react";

import {
  getTransactionsTimelineData,
  type TransactionsTimelineData,
} from "@/lib/transactions-data";

/** Swap implementation for live Aomi tx list / wallet history without changing UI. */
export function useTransactionsTimeline(): TransactionsTimelineData {
  return useMemo(() => getTransactionsTimelineData(), []);
}
