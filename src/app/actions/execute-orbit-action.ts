"use server";

import { executeOrbitActionCore } from "@/lib/aomi/execute-orbit-action-core";
import type {
  ExecuteOrbitActionInput,
  OrbitActionName,
  OrbitActionResult,
} from "@/lib/aomi/orbit-action-types";

export async function executeOrbitAction<A extends OrbitActionName>(
  input: ExecuteOrbitActionInput<A>
): Promise<OrbitActionResult<A>> {
  return executeOrbitActionCore(input);
}
