import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  console.warn(
    "OrbitOS: Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID for wallet connection (WalletConnect Cloud)."
  );
}

export const wagmiConfig = getDefaultConfig({
  appName: "OrbitOS",
  projectId: projectId ?? "00000000000000000000000000000000",
  chains: [base],
  ssr: true,
});
