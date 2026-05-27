import type { OrbitActionName } from "./orbit-action-types";
import type { ZoraToolName } from "@/lib/zora/types";

export const PROTECTED_ORBIT_ACTIONS = [
  "mint_coin",
  "set_price_alert",
  "message_recent_buyer",
] as const;

export type ProtectedOrbitAction = (typeof PROTECTED_ORBIT_ACTIONS)[number];

export const PROTECTED_ORBIT_ACTION_SET = new Set<OrbitActionName>(
  PROTECTED_ORBIT_ACTIONS
);

export function isProtectedOrbitAction(
  action: string
): action is ProtectedOrbitAction {
  return PROTECTED_ORBIT_ACTION_SET.has(action as OrbitActionName);
}

export function isProtectedZoraTool(tool: ZoraToolName): boolean {
  return isProtectedOrbitAction(tool);
}

export const TRANSACTION_CONFIRMATION_COPY = {
  blocked:
    "This action requires Review → Confirm → Execute. It will never run automatically.",
  review: "Review the simulation and transaction details below.",
  confirm: "Confirm to continue — your wallet will open next.",
  execute: "Execute only after you approve in the dialog and sign in your wallet.",
} as const;
