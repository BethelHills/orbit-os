import { FeaturePage } from "@/components/dashboard/feature-page";
import { alerts } from "@/lib/orbitos-data";

export default function AlertsPage() {
  return (
    <FeaturePage
      title="AI Watchtower"
      subtitle="Create alerts for holders, price moves, whale activity, and protocol changes."
      items={alerts}
    />
  );
}
