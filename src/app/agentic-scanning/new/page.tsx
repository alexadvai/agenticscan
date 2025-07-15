import NewScan from "@/components/new-scan";
import { PageHeader } from "@/components/page-header";

export default function NewScanPage() {
    return (
        <div className="w-full space-y-4">
            <PageHeader 
                title="New Scan"
                description="Configure and launch a new agentic scan."
            />
            <NewScan />
        </div>
    )
}