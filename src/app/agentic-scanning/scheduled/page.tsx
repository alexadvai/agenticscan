import ScheduledScans from "@/components/scheduled-scans";
import { PageHeader } from "@/components/page-header";

export default function ScheduledScansPage() {
    return (
        <div className="w-full space-y-4">
            <PageHeader
                title="Scheduled Scans"
                description="Manage your automated scanning schedules."
            />
            <ScheduledScans />
        </div>
    )
}