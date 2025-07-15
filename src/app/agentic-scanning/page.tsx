import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScanDashboard from "@/components/scan-dashboard";
import NewScan from "@/components/new-scan";
import ScanResultsTable from "@/components/scan-results-table";
import ScheduledScans from "@/components/scheduled-scans";
import { BarChart2, ScanLine, History, CalendarClock } from "lucide-react";
import { mockScanResults } from '@/lib/mock-data';

export default function AgenticScanningPage() {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
        <TabsTrigger value="dashboard" className="py-2"><BarChart2 className="mr-2 h-4 w-4" />Scan Dashboard</TabsTrigger>
        <TabsTrigger value="new" className="py-2"><ScanLine className="mr-2 h-4 w-4" />New Scan</TabsTrigger>
        <TabsTrigger value="results" className="py-2"><History className="mr-2 h-4 w-4" />Scan Results</TabsTrigger>
        <TabsTrigger value="scheduled" className="py-2"><CalendarClock className="mr-2 h-4 w-4" />Scheduled Scans</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard" className="mt-6">
        <ScanDashboard />
      </TabsContent>
      <TabsContent value="new" className="mt-6">
        <NewScan />
      </TabsContent>
      <TabsContent value="results" className="mt-6">
        <ScanResultsTable results={mockScanResults} />
      </TabsContent>
      <TabsContent value="scheduled" className="mt-6">
        <ScheduledScans />
      </TabsContent>
    </Tabs>
  );
}
