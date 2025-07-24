'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Target, ShieldAlert, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import type { DashboardStat, ScanResult } from '@/lib/types';
import { mockScanResults } from "@/lib/mock-data";
import { subDays, format, isWithinInterval } from "date-fns";

// Function to generate dashboard data from scan results
const generateDashboardData = (scans: ScanResult[]) => {
    const highRiskAssets = scans.filter(s => s.riskScore > 75).length;
    const totalTargets = new Set(scans.map(s => s.target)).size;
    
    const now = new Date();
    const oneWeekAgo = subDays(now, 7);
    
    const scansThisWeek = scans.filter(s => isWithinInterval(new Date(s.createdAt), { start: oneWeekAgo, end: now })).length;
    const pendingScans = scans.filter(s => s.status === 'Pending' || s.status === 'Running').length;

    const stats: DashboardStat[] = [
        { title: "High-Risk Assets", value: String(highRiskAssets), icon: ShieldAlert },
        { title: "Total Targets", value: String(totalTargets), icon: Target },
        { title: "Scans This Week", value: String(scansThisWeek), icon: CheckCircle2 },
        { title: "Active Scans", value: String(pendingScans), icon: Clock },
    ];

    const weeklyScansData = Array.from({ length: 7 }).map((_, i) => {
        const day = subDays(now, 6 - i);
        const dayKey = format(day, 'E'); // Mon, Tue, etc.
        const scansOnDay = scans.filter(s => format(new Date(s.createdAt), 'E') === dayKey && isWithinInterval(new Date(s.createdAt), { start: oneWeekAgo, end: now }));
        return {
            name: dayKey,
            scans: scansOnDay.length,
            risks: scansOnDay.filter(s => s.riskScore > 50).length,
        };
    });

    return { stats, weeklyScansData };
};


export default function ScanDashboard() {
  const { stats, weeklyScansData } = generateDashboardData(mockScanResults);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className="text-xs text-muted-foreground">
                  {stat.change} from last week
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Scan Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyScansData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))'
                    }}
                  />
                  <Legend iconSize={10} />
                  <Bar dataKey="scans" fill="hsl(var(--primary))" name="Total Scans" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="risks" fill="hsl(var(--destructive))" name="New Risks" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
