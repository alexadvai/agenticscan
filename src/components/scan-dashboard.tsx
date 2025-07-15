'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Target, ShieldAlert, CheckCircle2, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import type { DashboardStat } from '@/lib/types';

const stats: DashboardStat[] = [
    { title: "High-Risk Assets", value: "12", icon: ShieldAlert, change: "+2", changeType: 'increase' },
    { title: "Total Targets", value: "348", icon: Target, change: "+15", changeType: 'increase' },
    { title: "Scans This Week", value: "89", icon: CheckCircle2, change: "-5", changeType: 'decrease' },
    { title: "Pending Scans", value: "3", icon: Clock },
];

const weeklyScansData = [
  { name: 'Mon', scans: 4, risks: 2 },
  { name: 'Tue', scans: 3, risks: 3 },
  { name: 'Wed', scans: 2, risks: 1 },
  { name: 'Thu', scans: 2.7, risks: 2 },
  { name: 'Fri', scans: 1.8, risks: 1 },
  { name: 'Sat', scans: 2.3, risks: 3 },
  { name: 'Sun', scans: 3.4, risks: 1 },
];

export default function ScanDashboard() {
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
                <p className="text-xs text-muted-foreground flex items-center">
                    <span className={`flex items-center mr-1 ${stat.changeType === 'increase' ? 'text-red-500' : 'text-green-500'}`}>
                        {stat.changeType === 'increase' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {stat.change}
                    </span>
                    from last week
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
                  <Bar dataKey="risks" fill="hsl(var(--accent))" name="New Risks" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
