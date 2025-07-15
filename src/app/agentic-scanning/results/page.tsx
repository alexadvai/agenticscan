import ScanResultsTable from "@/components/scan-results-table";
import { mockScanResults } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";

export default function ScanResultsPage() {
    return (
        <div className="w-full space-y-4">
            <PageHeader 
                title="Scan Results"
                description="Review the findings from your past scans."
            />
            <ScanResultsTable results={mockScanResults} />
        </div>
    )
}