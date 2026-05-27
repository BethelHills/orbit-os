import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";

export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? base.id);

export const config = getDefaultConfig({
  appName: "OrbitOS",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
    "b3fc880a46f7ab1208f5298a06b6c8f6",
  chains: [base],
  ssr: true,
});
