import { FeaturePage } from "@/components/dashboard/feature-page";
import { protocols } from "@/lib/orbitos-data";

export default function ProtocolsPage() {
  return (
    <FeaturePage
      title="Protocol Universe"
      subtitle="Explore Base protocols connected to OrbitOS and Aomi agent workflows."
      items={protocols}
    />
  );
}
