import type { OrbitActionName } from "./orbit-action-types";
import { WRITE_ORBIT_ACTIONS } from "./orbit-action-types";
import type { ProtectedOrbitAction } from "./protected-transactions";

export type WriteOrbitActionName = ProtectedOrbitAction;

export const ORBIT_ACTION_COSTS: Record<WriteOrbitActionName, string> = {
  mint_coin: "0.002 ETH",
  set_price_alert: "0 ETH",
  message_recent_buyer: "0 ETH",
};

export function getOrbitActionCost(action: OrbitActionName): string | null {
  if (!WRITE_ORBIT_ACTIONS.has(action)) return null;
  return ORBIT_ACTION_COSTS[action as WriteOrbitActionName];
}
