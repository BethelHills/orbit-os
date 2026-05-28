import { FeaturePage } from "@/components/dashboard/feature-page";
import { settingsItems } from "@/lib/orbitos-data";

export default function SettingsPage() {
  return (
    <FeaturePage
      title="AI Control Center"
      subtitle="Control safety, wallet behavior, agent mode, network, and UI preferences."
      items={settingsItems}
    />
  );
}
