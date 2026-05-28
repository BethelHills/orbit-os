import { FeaturePage } from "@/components/dashboard/feature-page";
import { integrations } from "@/lib/orbitos-data";

export default function IntegrationsPage() {
  return (
    <FeaturePage
      title="Skills Hub"
      subtitle="Manage Aomi skills and Web3 agent toolkits connected to OrbitOS."
      items={integrations}
    />
  );
}
