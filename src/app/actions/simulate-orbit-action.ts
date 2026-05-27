"use server";

import { simulateOrbitActionCore } from "@/lib/aomi/simulate-orbit-action";
import type { ExecuteOrbitActionInput, OrbitActionName } from "@/lib/aomi/orbit-action-types";

export async function simulateOrbitAction<A extends OrbitActionName>(
  input: Pick<ExecuteOrbitActionInput<A>, "action" | "params">
) {
  return simulateOrbitActionCore(input.action, input.params);
}
