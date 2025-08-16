
'use client';

import { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import type { ScanResult, ScanStatus } from '@/lib/types';
import { format, formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns';
import { Button } from './ui/button';
import { ArrowUpDown, Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import type { DateRange } from 'react-day-picker';

type SortKey = 'target' | 'riskScore' | 'createdAt';
type SortDirection = 'asc' | 'desc';

const statusStyles: Record<ScanStatus, string> = {
  Completed: 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300 border-green-500/20',
  Pending: 'bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300 border-yellow-500/20',
  Running: 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-500/20',
  Error: 'bg-destructive/10 text-destructive dark:bg-destructive/20 border-destructive/20',
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
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'createdAt', direction: 'desc' });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const filteredAndSortedResults = useMemo(() => {
    let filteredItems = [...results];

    if (dateRange?.from) {
        filteredItems = filteredItems.filter(item => isAfter(parseISO(item.createdAt), dateRange.from!));
    }
    if (dateRange?.to) {
        filteredItems = filteredItems.filter(item => isBefore(parseISO(item.createdAt), dateRange.to!));
    }

    if (sortConfig !== null) {
      filteredItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredItems;
  }, [results, sortConfig, dateRange]);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader = ({ sortKey, children }: { sortKey: SortKey, children: React.ReactNode }) => (
    <Button variant="ghost" onClick={() => requestSort(sortKey)}>
      {children}
      <ArrowUpDown className={cn("ml-2 h-4 w-4", sortConfig.key !== sortKey && "opacity-30")} />
    </Button>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
         <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Filter by date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        { (dateRange?.from || dateRange?.to) && <Button variant="ghost" onClick={() => setDateRange(undefined)}>Reset</Button>}
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortableHeader sortKey="target">Target</SortableHeader>
              </TableHead>
              <TableHead className="hidden sm:table-cell">Scan Type</TableHead>
              <TableHead className="hidden md:table-cell">Agent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                 <SortableHeader sortKey="riskScore">Risk Score</SortableHeader>
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                <SortableHeader sortKey="createdAt">Finished</SortableHeader>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedResults.length > 0 ? (
              filteredAndSortedResults.map((result) => (
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
                  No scan results found for the selected criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
