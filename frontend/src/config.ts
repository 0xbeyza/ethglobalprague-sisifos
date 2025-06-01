import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { http } from "wagmi";

const config = getDefaultConfig({
  appName: "frontend",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia],
  // ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/..."),
  },
});

export default config;
