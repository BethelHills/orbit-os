import { FeaturePage } from "@/components/dashboard/feature-page";
import { actions } from "@/lib/orbitos-data";

export default function TradeActionsPage() {
  return (
    <FeaturePage
      title="Trade / Actions"
      subtitle="Simulate, review, and execute Aomi-powered on-chain actions safely."
      items={actions}
    />
  );
}
