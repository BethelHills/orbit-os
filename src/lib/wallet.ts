import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "OrbitOS",
  projectId: "b3fc880a46f7ab1208f5298a06b6c8f6",
  chains: [base],
  ssr: true,
});
