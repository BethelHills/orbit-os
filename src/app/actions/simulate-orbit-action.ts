"use server";

import * as Sentry from "@sentry/nextjs";
import { headers } from "next/headers";

import { simulateOrbitActionCore } from "@/lib/aomi/simulate-orbit-action";
import type { ExecuteOrbitActionInput, OrbitActionName } from "@/lib/aomi/orbit-action-types";

export async function simulateOrbitAction<A extends OrbitActionName>(
  input: Pick<ExecuteOrbitActionInput<A>, "action" | "params">
) {
  return Sentry.withServerActionInstrumentation(
    "simulateOrbitAction",
    {
      headers: await headers(),
      recordResponse: true,
    },
    async () => simulateOrbitActionCore(input.action, input.params)
  );
}
