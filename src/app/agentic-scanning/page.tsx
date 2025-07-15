import ScanDashboard from "@/components/scan-dashboard";
import { PageHeader } from "@/components/page-header";

export default function AgenticScanningDashboardPage() {
  return (
    <div className="w-full space-y-4">
      <PageHeader
        title="Scan Dashboard"
        description="An at-a-glance overview of your security posture."
      />
      <ScanDashboard />
    </div>
  );
}
