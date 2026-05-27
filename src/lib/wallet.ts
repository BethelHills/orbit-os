import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";

import { CHAIN_ID, WALLETCONNECT_PROJECT_ID } from "@/lib/env";

export { CHAIN_ID };

export const config = getDefaultConfig({
  appName: "OrbitOS",
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [base],
  ssr: true,
});
