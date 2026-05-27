import type { OrbitActionName } from "./orbit-action-types";
import type { ExecuteOrbitActionInput } from "./orbit-action-types";

export type OrbitSimulationStep = {
  name: string;
  success: boolean;
  gasUsed: number;
};

export function simulationStepsForAction(
  action: OrbitActionName,
  params: ExecuteOrbitActionInput["params"]
): OrbitSimulationStep[] {
  switch (action) {
    case "mint_coin": {
      const input = params as ExecuteOrbitActionInput<"mint_coin">["params"];
      return [
        {
          name: `Deploy ${input.name} (${input.symbol}) on Zora`,
          success: true,
          gasUsed: 312_000,
        },
        { name: "Set creator coin metadata", success: true, gasUsed: 89_000 },
        { name: "Initialize liquidity pool on Base", success: true, gasUsed: 81_000 },
      ];
    }
    case "set_price_alert": {
      const input = params as ExecuteOrbitActionInput<"set_price_alert">["params"];
      return [
        {
          name: `Register alert at ${input.targetPriceEth} ETH`,
          success: true,
          gasUsed: 46_000,
        },
      ];
    }
    default:
      return [{ name: `${action} read path`, success: true, gasUsed: 21_000 }];
  }
}
