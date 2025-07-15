import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import type { ScanResult, ScanStatus } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

const statusStyles: Record<ScanStatus, string> = {
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-300',
  Running: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300',
  Error: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-300',
};

function RiskBadge({ score }: { score: number }) {
  const getRiskProps = (score: number) => {
    if (score > 75) return { label: 'Critical', className: 'bg-red-500/20 text-red-500 border-red-500/50' };
    if (score > 50) return { label: 'High', className: 'bg-orange-500/20 text-orange-500 border-orange-500/50' };
    if (score > 25) return { label: 'Medium', className: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' };
    if (score > 0) return { label: 'Low', className: 'bg-blue-500/20 text-blue-500 border-blue-500/50' };
    return { label: 'Info', className: 'bg-gray-500/20 text-gray-500 border-gray-500/50' };
  };

  const { label, className } = getRiskProps(score);

  return <Badge variant="outline" className={cn('font-mono', className)}>{label}</Badge>;
}

export default function ScanResultsTable({ results }: { results: ScanResult[] }) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Target</TableHead>
            <TableHead className="hidden sm:table-cell">Scan Type</TableHead>
            <TableHead className="hidden md:table-cell">Agent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead className="hidden lg:table-cell">Finished</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length > 0 ? (
            results.map((result) => (
              <TableRow key={result.id} className="cursor-pointer hover:bg-muted/80">
                <TableCell className="font-medium">
                    <Link href={`/agentic-scanning/${result.id}`} className="hover:underline">
                        {result.target}
                    </Link>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{result.scanType}</TableCell>
                <TableCell className="hidden md:table-cell">{result.agent}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(statusStyles[result.status])}>
                    {result.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {result.riskScore > 0 ? <RiskBadge score={result.riskScore} /> : '-'}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDistanceToNow(new Date(result.createdAt), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No scan results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
