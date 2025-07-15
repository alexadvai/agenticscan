import type { LucideIcon } from 'lucide-react';

export type ScanStatus = 'Completed' | 'Pending' | 'Running' | 'Error';

export type Vulnerability = {
  cve: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
  description: string;
};

export type ScanResult = {
  id: string;
  target: string;
  scanType: 'Quick' | 'Full' | 'Stealth' | 'Custom';
  agent: string;
  status: ScanStatus;
  riskScore: number;
  summary: string;
  createdAt: string;
  findings: {
    raw: string;
    openPorts: { port: number; service: string }[];
    osGuess: string;
    vulnerabilities: Vulnerability[];
  };
};

export type ScheduledScan = {
  id: string;
  target: string;
  scanType: 'Quick' | 'Full' | 'Stealth' | 'Custom';
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  nextRun: string;
  enabled: boolean;
};

export type DashboardStat = {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'increase' | 'decrease';
};
